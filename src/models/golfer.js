const sequelize = require('sequelize');

const GolferModels = (db) => {
  const Golfer = db.define('Golfer', {
    golferName: sequelize.DataTypes.STRING,
    golferCountry: sequelize.DataTypes.STRING,
    worldRanking: sequelize.DataTypes.INTEGER,
  });

  const GolfSponsor = db.define('GolfCompany', {
    companyName: sequelize.DataTypes.STRING,
    equipmentType: sequelize.DataTypes.STRING,
  });

  GolfSponsor.belongsTo(Golfer);

  GolfSponsor.hasMany(Golfer);
  Golfer.hasMany(GolfSponsor);

  return {Golfer, GolfSponsor };
};

//Lazy Eval
// const {Golfer, GolfSponsor} = GolferModels({});

// async function doStuffLazy() {
//   const golfer = await Golfer.findOne({where: {golferId: Id}});
//   //2nd DB query
//   const sponsors = await golfer.getSponsors();
// }

// //Eager
// async function doStuffEager() {
//   const golfer = await Golfer.findOne({
//     where: {golferId: 'example'},
//     include: GolfSponsor,
//   });

//   const sponsors = golfer.sponsors;
// }


module.exports = { GolferModels };
