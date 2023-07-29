const cors = require('cors');

const options = {
	origin: '*',
};

exports.corsMiddleware = cors(options);
