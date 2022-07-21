'use strict';

const express = require('express');
const { db } = require('./db');

const app = express();
const notFound = require('./error-handlers/404');
const serverError = require('./error-handlers/500');
const { logger } = require('./middleware/logger');
const { validator } = require('./middleware/validator');
const { data } = require('../src/handlers/data');
const { hello } = require('../src/handlers/hello');
const { person } = require('../src/handlers/person');
const { createGolfer, listGolfers, getGolfer, deleteGolfer, updateGolfer } = require('./handlers/golfer');
const{ createMusician, listMusician, getMusician, deleteMusician, updateMusician } = require('./handlers/musician');

const makeError = () => {
  throw new Error('This is the error generator');
};

app.get('/', hello);
app.get('/data', data);
app.get('/throw-error', makeError);

app.use(logger);
app.use(express.json());

app.get('/person/:name', validator, person);

app.get('/golfer', listGolfers);
app.post('/golfer', createGolfer);
app.get('/golfer/:id', getGolfer);
app.delete('/golfer/:id', deleteGolfer);
app.put('/golfer/:id', updateGolfer);

app.get('/musician', listMusician);
app.post('/musician', createMusician);
app.get('/musician/:id', getMusician);
app.delete('/musician/:id', deleteMusician);
app.put('/musician/:id', updateMusician);

app.use(notFound.handle404Error);
app.use(serverError.handle500Error);

const shouldSyncOnStart = true;
async function start(port) {
  if(shouldSyncOnStart){
    await db.sync();
  }
  app.listen(port, () => console.log(`Server listening on port ${port}`));
}

module.exports = {
  app,
  start,
};
