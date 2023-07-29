const mongoose = require('mongoose');

const { Schema } = mongoose;

const InvoiceSchema = Schema({
	createdAt: {
		type: Date,
		default: Date.now,
	},
	senderAgent: {
		type: Object,
		required: true,
	},
	senderAddress: {
		type: String,
		required: true,
	},
	qrRawData: {
		type: String,
		required: true,
	},
	content: {
		type: Object,
		required: false,
	},
	photos: {
		type: [String],
		required: true,
	},
});

exports.Invoice = mongoose.model('Invoice', InvoiceSchema);
