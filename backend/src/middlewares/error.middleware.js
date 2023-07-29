const createError = require('http-errors');

const handleHttpError = (err, req, res) => {
	const { status, message } = err;

	res.status(status).json({
		status,
		message,
	});
};

const { logger } = require('../logger');

const handleUnknownError = (err, req, res) => {
	logger.error(err);
	res.status(500).json({
		status: 500,
		message: 'Internal server error.',
	});
};

const errorHandler = (err, req, res, next) => {
	if (createError.isHttpError(err)) {
		handleHttpError(err, res, res);
	} else {
		handleUnknownError(err, req, res);
	}
};

const notFoundPathHandler = (req, res, next) =>
	next(new createError.NotFound());

module.exports = {
	errorHandler,
	notFoundPathHandler,
};
