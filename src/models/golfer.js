const { DataTypes } = require('sequelize');

function golfer(db) {
  return db.define('Golfer', {
    golferName: DataTypes.STRING,
    golferCountry: DataTypes.STRING,
    worldRanking: DataTypes.INTEGER,
  });
}

module.exports = { golfer };
