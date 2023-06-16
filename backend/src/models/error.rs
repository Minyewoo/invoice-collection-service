use actix_web::{
    http::{header::ContentType, StatusCode},
    HttpResponse,
};

#[derive(Debug)]
pub enum ApiError {
    DbError(String),
    InvalidFilesError(String),
    CanNotSaveFile(String),
}

impl ApiError {
    fn message(&self) -> String {
        match &self {
            ApiError::DbError(message) => message.to_string(),
            ApiError::InvalidFilesError(message) => message.to_string(),
            ApiError::CanNotSaveFile(message) => message.to_string(),
        }
    }
}

impl std::fmt::Display for ApiError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "Api Error: {}",
            self.message(),
        )
    }
}

impl std::error::Error for ApiError {}

impl actix_web::error::ResponseError for ApiError {
    fn error_response(&self) -> HttpResponse {
        HttpResponse::build(self.status_code())
            .insert_header(ContentType::json())
            .body(format!("{{\"error\": \"{}\"}}", self.message()))
    }

    fn status_code(&self) -> StatusCode {
        match *self {
            ApiError::DbError(_) => StatusCode::INTERNAL_SERVER_ERROR,
            ApiError::InvalidFilesError(_) => StatusCode::BAD_REQUEST,
            ApiError::CanNotSaveFile(_) => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }
}