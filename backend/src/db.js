const mongoose = require('mongoose');
const { logger } = require('./logger');
const { config } = require('./config');

const {
	name: DB_NAME,
	port: DB_PORT,
	host: DB_HOST,
	username: DB_USERNAME,
	password: DB_PASSWORD,
} = config.db;

const uri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const options = {
	authSource: 'admin',
	user: DB_USERNAME,
	pass: DB_PASSWORD,
};

exports.db = {
	connect: async () => {
		try {
			await mongoose.connect(uri, options);
			logger.info(`Connected to ${uri} database.`);
		} catch (err) {
			logger.error(`Unable to connect to ${uri} database.`);
			throw err;
		}
	},
};
