exports.config = {
	app: {
		host: process.env.HOST ?? '0.0.0.0',
		port: parseInt(process.env.PORT) || 8080,
		staticPath: process.env.STATIC_PATH ?? 'public',
		certPath: process.env.CERT_PATH ?? './ssl/express-selfsigned.crt',
		certKeyPath: process.env.CERT_KEY_PATH ?? './ssl/express-selfsigned.key',
	},
	db: {
		name: process.env.DB_NAME ?? 'example',
		host: process.env.DB_HOST ?? 'localhost',
		port: parseInt(process.env.DB_PORT) || 27017,
		username: process.env.DB_USERNAME ?? 'root',
		password: process.env.DB_PASSWORD ?? 'kavo',
	},
	logger: {
		level: process.env.LOGGER_LEVEL ?? 'debug',
	},
	env: process.env.ENV ?? 'development',
};
