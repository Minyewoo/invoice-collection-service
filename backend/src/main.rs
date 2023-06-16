use actix_files as fs;
use actix_web::{App, HttpServer};
use bb8::Pool;
use bb8_postgres::{tokio_postgres, PostgresConnectionManager};
use models::config::Config;
use routes::{health::signal_health, invoice::create_invoice};
pub mod routes;
pub mod models;
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let config = Config::from_env();
    let manager = PostgresConnectionManager::new_from_stringlike(
        format!("postgres://{}:{}@{}/{}", config.db_user, config.db_password, config.db_host, config.db_name), 
        tokio_postgres::NoTls,
    ).unwrap();
    let pool = Pool::builder()
        .max_size(5)
        .build(manager)
        .await
        .unwrap();
    HttpServer::new(
        move || App::new()
            .app_data(pool.clone())
            .service(signal_health)
            .service(create_invoice)
            .service(fs::Files::new("/static", "."))
        )
        .bind(("0.0.0.0", 8080))?
        .run()
        .await
}