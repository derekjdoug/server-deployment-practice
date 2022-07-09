'use strict';

require('dotenv').config();

const port = process.env.PORT;

const server = require('./server.js');

server.start(port);
