'use strict';

const express = require('express');
const { db, golfer, musician } = require('./db');

const app = express();
const notFound = require('./error-handlers/404');
const serverError = require('./error-handlers/500');
const { logger } = require('./middleware/logger');
const { validator } = require('./middleware/validator');
const { data } = require('../src/handlers/data');
const { hello } = require('../src/handlers/hello');
const { person } = require('../src/handlers/person');
const Collection = require('../src/models/collection');


const makeError = () => {
  throw new Error('This is the error generator');
};

app.get('/', hello);
app.get('/data', data);
app.get('/throw-error', makeError);

app.use(logger);
app.use(express.json());

app.get('/person/:name', validator, person);

new Collection(golfer.Golfer, app, '/golfer');
new Collection(golfer.GolfSponsor, app, '/golfSponsors');
new Collection(musician, app, '/musician');

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
