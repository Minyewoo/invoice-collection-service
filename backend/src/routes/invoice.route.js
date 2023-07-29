const express = require('express');
const {
	uploadInvoice,
	uploadInvoiceFilesMiddleware,
} = require('../controllers/invoice.controller');

const invoiceRouter = express.Router();

invoiceRouter.post('/', uploadInvoiceFilesMiddleware, uploadInvoice);

module.exports = invoiceRouter;
