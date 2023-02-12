use actix_web::{App, HttpServer};
use routes::health::signal_health;
pub mod routes;
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(signal_health))
        .bind(("0.0.0.0", 8080))?
        .run()
        .await
}