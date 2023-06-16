pub struct Config {
    pub db_host: String,
    pub db_user: String,
    pub db_password: String,
    pub db_name: String,
}

impl Config {
    pub fn from_env() -> Config {
        Config {
            db_host: std::env::var("DB_HOST").unwrap_or("localhost".to_string()),
            db_user: std::env::var("DB_USER").unwrap_or("postgres".to_string()),
            db_password: std::env::var("DB_PASSWORD").unwrap_or("postgres".to_string()),
            db_name: std::env::var("DB_NAME").unwrap_or("invoices_meta".to_string()),
        }
    }
}