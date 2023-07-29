const { logger } = require('../logger');

exports.asyncWrapperMiddleware = fn => async (req, res, next) => {
	try {
		await fn(req, res, next);
	} catch (err) {
		next(err);
	}
};
