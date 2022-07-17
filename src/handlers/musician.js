const { Musician } = require('../db');

const createMusician = async (req, res) => {
  const { musicianType, instrument } = req.body;

  const musician = Musician.build({ musicianType, instrument });

  await musician.save();

  res.status(200).send(musician);
};

const listMusician = async (req, res) => {
  const musician = await Musician.findAll();

  res.status(200).send(musician);
};

const getMusician = async (req, res) => {
  const musician = await Musician.findAll({
    where: {
      id: req.params.id,
    },
  });


  if (musician.length > 0) {
    res.status(200).send(musician[0]);
  } else {
    res.status(404).send(`Could not find musician with id ${req.params.id}`);
  }
};

const deleteMusician = async (req, res) => {
  const musicians = await Musician.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (musicians.length > 0) {
    res.status(200).send('Error');
  } else {
    res.status(200).send('Musician Deleted');
  }
};

const updateMusician = async (req, res) => {
  await Musician.update({ musicianType: req.query.musicianType, instrument: req.query.instrument },
    {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
  res.status(200).send('It worked');
};

module.exports = {
  createMusician,
  listMusician,
  getMusician,
  deleteMusician,
  updateMusician,
};
