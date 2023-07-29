const express = require('express');
const useragent = require('express-useragent');
const https = require('https');
const fs = require('fs');
const path = require('path');
const invoice = require('./routes/invoice.route');
const { db } = require('./db');
const { config } = require('./config');
const { logger, loggerMiddleware } = require('./logger');
const { corsMiddleware } = require('./middlewares/cors.middleware');
const {
	errorHandler,
	notFoundPathHandler,
} = require('./middlewares/error.middleware');

const {
	port: APP_PORT,
	host: APP_HOST,
	staticPath: STATIC_PATH,
	certPath: CERT_PATH,
	certKeyPath: CERT_KEY_PATH,
} = config.app;
const app = express();

// middlewares
app.use(loggerMiddleware);
app.use(corsMiddleware);
app.use(useragent.express());
app.use(express.static(path.join(__dirname, STATIC_PATH)));
// routes
app.use('/invoice', invoice);
// error handlers
app.use(notFoundPathHandler);
app.use(errorHandler);

exports.app = {
	db: db,
	listen: (...args) => {
		return new Promise((resolve, reject) => {
			https
				.createServer(
					{
						key: fs.readFileSync(CERT_KEY_PATH),
						cert: fs.readFileSync(CERT_PATH),
					},
					app
				)
				.listen(...args, err => {
					if (err) reject(err);
					resolve();
				});
		});
	},
	start: async function () {
		try {
			await this.db.connect();
			await this.listen(APP_PORT, APP_HOST);
			logger.info(`Running app on https://${APP_HOST}:${APP_PORT}.`);
		} catch (err) {
			logger.error(err);
		}
	},
};
