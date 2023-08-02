const express = require('express');
const invoice = require('./routes/invoice.route');

const api = express();
api.use('/invoice', invoice);

exports.api = api;
