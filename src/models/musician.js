const { DataTypes } = require('sequelize');

function musician(db) {
  return db.define('Musician', {
    musicianType: DataTypes.STRING,
    instrument: DataTypes.STRING,
  });

}

module.exports = { musician };
