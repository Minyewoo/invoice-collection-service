const express = require('express');
const useragent = require('express-useragent');
const path = require('path');
const { db } = require('./db');
const { config } = require('./config');
const { logger, loggerMiddleware } = require('./logger');
const { corsMiddleware } = require('./middlewares/cors.middleware');
const {
	errorHandler,
	notFoundPathHandler,
} = require('./middlewares/error.middleware');
const { api } = require('./api');

const { port: APP_PORT, host: APP_HOST, staticPath: STATIC_PATH } = config.app;
const app = express();

// middlewares
app.use(loggerMiddleware);
app.use(corsMiddleware);
app.use(useragent.express());
app.use(express.static(path.join(__dirname, STATIC_PATH)));
// routes
app.use('/api/v1', api);
// error handlers
app.use(notFoundPathHandler);
app.use(errorHandler);

exports.app = {
	db: db,
	listen: (...args) => {
		return new Promise((resolve, reject) => {
			app.listen(...args, err => {
				if (err) reject(err);
				resolve();
			});
		});
	},
	start: async function () {
		try {
			await this.db.connect();
			await this.listen(APP_PORT, APP_HOST);
			logger.info(`Running app on http://${APP_HOST}:${APP_PORT}.`);
		} catch (err) {
			logger.error(err);
		}
	},
};
