const multer = require('multer');
const createError = require('http-errors');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { config } = require('../config');
const { Invoice } = require('../models/invoice.model');
const { asyncWrapperMiddleware } = require('../middlewares/async.middleware');

const { staticPath: STATIC_PATH } = config.app;
const FILES_PATH = 'uploads';
const ALLOWED_FILE_EXTENSIONS = ['image/png', 'image/jpeg'];
const LIMIT_FILES_COUNT = 5;
const LIMIT_FILE_SIZE = 10 * 1024 * 1024; // max size in bytes

const fileFilter = (req, file, cb) => {
	if (!ALLOWED_FILE_EXTENSIONS.includes(file.mimetype)) {
		return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file), false);
	}
	return cb(null, true);
};

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		const filePath = path.join(STATIC_PATH, FILES_PATH);
		fs.mkdirSync(filePath, { recursive: true });
		cb(null, filePath);
	},
	filename: (req, file, cb) => {
		cb(null, uuidv4() + path.extname(file.originalname));
	},
});

const formDataUploader = multer({
	storage: fileStorage,
	fileFilter: fileFilter,
	limits: {
		fileSize: LIMIT_FILE_SIZE,
	},
}).fields([{ name: 'photos', maxCount: LIMIT_FILES_COUNT }]);

const uploadInvoiceFilesMiddleware = (req, res, next) => {
	formDataUploader(req, res, err => {
		if (err && err instanceof multer.MulterError) {
			switch (err.code) {
				case 'LIMIT_FILE_SIZE':
					return next(new createError.PayloadTooLarge('File is too large.'));
				case 'LIMIT_UNEXPECTED_FILE':
					return next(new createError.BadRequest('Invalid file extension.'));
				default:
					return next(new createError.BadRequest());
			}
		}
		if (err) return next(err);
		return next();
	});
};

const uploadInvoiceData = async ({
	senderAgent,
	senderAddress,
	qrRawData,
	content,
	photos,
}) => {
	const invoice = new Invoice({
		senderAgent,
		senderAddress,
		qrRawData,
		content,
		photos,
	});
	return await invoice.save();
};

const uploadInvoice = async (req, res) => {
	const { useragent, ip } = req;
	const { qrraw, content } = req.body;
	const { photos } = req.files;

	if (!photos?.length) {
		throw new createError.BadRequest('Invoice photo required.');
	}

	const invoice = await uploadInvoiceData({
		senderAgent: useragent,
		senderAddress: ip,
		qrRawData: qrraw,
		content: JSON.parse(content),
		photos: photos.map(photo => photo.path),
	});

	res.status(200).json({
		status: 200,
		message: 'Invoice uploaded.',
		id: invoice.id,
	});
};

module.exports = {
	uploadInvoiceFilesMiddleware,
	uploadInvoice: asyncWrapperMiddleware(uploadInvoice),
};
