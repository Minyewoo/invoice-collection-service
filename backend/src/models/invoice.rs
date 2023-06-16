pub struct Invoice {
    pub id: i32,
    pub qr_link: String,
    pub qr_content: String,
    // timestamp: i64,
    // photo_paths: Vec<String>,
}

pub struct InvoicePhoto {
    pub id: i32,
    pub file_path: String,
    pub invoice_id: i32,
    // timestamp: i64,
    // photo_paths: Vec<String>,
}