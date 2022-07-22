const { Sequelize } = require('sequelize');
const { Golfer } = require('./models/Golfer');
const { musician } = require('./models/musician');

let connection_string;
switch (process.env.NODE_ENV) {
  case 'production':
    connection_string = process.env.DATABASE_URL;
    break;
  case 'test':
    connection_string = 'sqlite::memory';
    break;
  case 'staging':
  default:
      connection_string = `sqlite:${process.env.SQLITE_FILE ?? '../db'}`;
      break;
}

const db = new Sequelize(connection_string, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

//Dev Only
// db.sync();

module.exports = {
  db,
  Golfer: Golfer(db),
  Musician: musician(db),
};
