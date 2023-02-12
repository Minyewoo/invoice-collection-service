use actix_web::{get, HttpResponse, Responder};
#[get("/health")]
async fn signal_health() -> impl Responder {
    HttpResponse::Ok()
}