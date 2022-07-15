'use strict';

require('dotenv').config();
require('./src/server');

const port = process.env.PORT;

const server = require('./src/server.js');

server.start(port);
