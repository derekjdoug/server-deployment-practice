'use strict';

const express = require('express');

const hello = (req, res) => {
  res.status(200).send('Hello, World');
};

const data = (req, res) => {
  res.status(200).send({
    name: 'Dougie',
    role: 'Student',
  });
};

const person = (req, res) => {
  res.status(200).send({
    name: req.params,
  });
};

const app = express();
const notFound = require('./error-handlers/404');
const serverError = require('./error-handlers/500');
const { logger } = require('./middleware/logger');
const { validator } = require('./middleware/validator');

app.get('/', hello);
app.get('/data', data);

app.use(logger);

app.get('/person/:name', validator, person);
app.use(notFound.handle404Error);
app.use(serverError.handle500Error);

function start(port) {
  app.listen(port, () => console.log(`Server listening on port ${port}`));
}

module.exports = {
  app,
  start,
};
