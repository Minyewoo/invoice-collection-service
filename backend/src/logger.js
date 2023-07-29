const pino = require('pino');
const httpLogger = require('pino-http');
const { config } = require('./config');

const { level: LOGGER_LEVEL } = config.logger;

const loggerOptions = {
	level: LOGGER_LEVEL,
};
const logger = pino(loggerOptions);

const middlewareOptions = {
	logger: logger,
};
const loggerMiddleware = httpLogger(middlewareOptions);

module.exports = {
	logger,
	loggerMiddleware,
};
