CREATE DATABASE invoices_meta;
\c invoices_meta;

CREATE TABLE Invoices (
    id integer not null primary Key generated always as identity,
    qr_link text,
    qr_content text
);

CREATE TABLE InvoicePhotos (
    id integer not null primary Key generated always as identity,
    file_path text,
    invoice_id integer REFERENCES Invoices(id)
);