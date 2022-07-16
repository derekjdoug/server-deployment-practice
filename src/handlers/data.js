const data = (req, res) => {
  res.status(200).send({
    name: 'Dougie',
    role: 'Student',
  });
};

module.exports = {
  data,
};
