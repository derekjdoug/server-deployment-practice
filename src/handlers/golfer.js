const { Golfer } = require('../db');

const createGolfer = async (req, res) => {
  const { golferName, golferCountry, worldRanking } = req.body;

  const golfer = Golfer.build({ golferName, golferCountry, worldRanking });

  await golfer.save();

  res.status(200).send(golfer);
};

const listGolfers = async (req, res) => {
  const golfers = await Golfer.findAll();

  res.status(200).send(golfers);
};

const getGolfer = async (req, res) => {
  const golfers = await Golfer.findAll({
    where: {
      id: req.params.id,
    },
  });

  if (golfers.length > 0) {
    res.status(200).send(golfers[0]);
  } else {
    res.status(400).send(`Could not find golfer with id ${req.params.id}`);
  }
};

const deleteGolfer = async (req, res) => {
  const golfers = await Golfer.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (golfers.length > 0) {
    res.status(200).send('Error');
  } else {
    res.status(200).send('Golfer Deleted');
  }
};

const updateGolfer = async (req, res) => {
  await Golfer.update({ golferName: req.query.golferName, golferCountry: req.query.golferCountry, worldRanking: req.query.worldRanking }, {
    where: {
      id: req.params.id,
    },
    //Post
    returning: true,
  });
  res.status(200).send('It worked');
};

module.exports = {
  createGolfer,
  listGolfers,
  getGolfer,
  deleteGolfer,
  updateGolfer,
};
