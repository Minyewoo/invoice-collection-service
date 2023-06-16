
use std::{io::Read};

use actix_web::{post, web, Responder};
use actix_easy_multipart::tempfile::Tempfile;
use actix_easy_multipart::text::Text;
use actix_easy_multipart::MultipartForm;
use tempfile::NamedTempFile;
use tokio_postgres::{NoTls};
use uuid::Uuid;
use bb8::{Pool, PooledConnection};
use bb8_postgres::{tokio_postgres, PostgresConnectionManager};
use crate::models::error::{ApiError};
use serde::Serialize;

#[derive(MultipartForm)]
struct InvoiceUpload {
    qr_link: Option<Text<String>>,
    qr_content: Option<Text<String>>,
    #[multipart(rename="invoice_photos[]")]
    invoice_photos: Vec<Tempfile>,
}

#[derive(Serialize)]
struct InvoiceUploadInfo {
    invoice_id: i32,
    invoice_photos_ids: Vec<i32>,
}

#[post("/invoice")]
async fn create_invoice(
    form: MultipartForm<InvoiceUpload>, 
    pool: web::Data<Pool<PostgresConnectionManager<tokio_postgres::NoTls>>>,
) -> impl Responder {
    let created_paths = match save_files(&form.invoice_photos) {
        Ok(paths) => paths,
        Err(error) => return Err(error),
    };
    let connection = pool
        .get().await.unwrap();

    let created_invoice_id = match insert_invoice(
        &connection, 
        to_sql_value(&form.qr_link), 
        to_sql_value(&form.qr_content),
    ).await {
        Ok(id) => id,
        Err(error) => return Err(error),
    };

    let created_invoice_photos_id = match insert_invoice_photos(
        &connection, 
        created_paths, 
        created_invoice_id,
    ).await {
        Ok(ids) => ids,
        Err(error) => return Err(error),
    };

    Ok(
        web::Json(
           InvoiceUploadInfo {
                invoice_id: created_invoice_id,
                invoice_photos_ids: created_invoice_photos_id,
            } 
        )
    )
}

fn validate_files(files: &[Tempfile]) -> bool {
    files 
    .iter()
    .map(|f| {
        f.content_type.as_ref()
        .map(|m| m.as_ref())
    })
    .all(|content_type| {
        match content_type {
            Some(value) => matches!(value, "image/jpeg" | "image/png"),
            None => false,
        }
    })
}

fn save_files(files: &[Tempfile]) -> Result<Vec<String>, ApiError> {
    match validate_files(files) {
        true => {
            let save_results = files
            .clone()
            .iter()
            .map(|temp_file| {
                save_file_with_secure_name(&temp_file.file)
            })
            .collect::<Vec<Result<String,ApiError>>>();

            let is_all_ok = save_results
            .iter()
            .all(|save_result| save_result.is_ok());

            match is_all_ok{
                true => Ok(
                    save_results
                    .into_iter()
                    .map(|save_result| save_result.unwrap())
                    .collect::<Vec<String>>(),
                ),
                false => Err(ApiError::CanNotSaveFile("Error while saving file".to_string())),
            }
        },
        false => return Err(ApiError::InvalidFilesError("Unsupported files".to_string())),
    }
}

fn save_file_with_secure_name(temp_file: &NamedTempFile) -> Result<String, ApiError> {
    let path = format!("./static/{}", Uuid::new_v4());
    let mut file = temp_file.as_file();
    let mut buf: Vec<u8>= Vec::new();
    if file.read_to_end(&mut buf).is_err() {
        return Err(ApiError::CanNotSaveFile("Unable to save file".to_string()));
    };
    match std::fs::write(path.clone(), buf) {
        Ok(_) => Ok(path),
        Err(_) => Err(ApiError::CanNotSaveFile("Unable to save file".to_string())),
    }
}

async fn insert_invoice(
    connection: &PooledConnection<'_, PostgresConnectionManager<NoTls>>, 
    qr_link: String, 
    qr_content: String,
) -> Result<i32, ApiError> {
    connection.query_one(
        "INSERT INTO Invoices (qr_link, qr_content) VALUES ({}, {});", 
        &[&qr_link, &qr_content],
    ).await
    .map(|row| row.get("id"))
    .map_err(|err| ApiError::DbError(err.to_string()))
}

async fn insert_invoice_photos(
    connection: &PooledConnection<'_, PostgresConnectionManager<NoTls>>, 
    photo_paths: Vec<String>, 
    invoice_id: i32,
) -> Result<Vec<i32>, ApiError> {
    let query_values = photo_paths
        .iter()
        .map(|file_path| format!("({}, {})", file_path, invoice_id))
        .collect::<Vec<String>>()
        .join(",");
    return match connection.query(
        "INSERT INTO InvoicePhotos (file_path, invoice_id) VALUES {};", 
        &[&query_values],
    )
    .await {
        Ok(rows) => Ok(
            rows
            .iter()
            .map(|row| row.get("id"))
            .collect::<Vec<i32>>()
        ),
        Err(_) => Err(ApiError::DbError("Failed to insert invoice photo".to_string())),
    }
}

fn to_sql_value(arg: &Option<Text<String>>) -> String {
    match arg {
        Some(value) => value.to_owned().to_string(),
        None => "NULL".to_string(),
    }
}