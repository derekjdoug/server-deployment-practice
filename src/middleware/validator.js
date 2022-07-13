const validator = (req, res, next) => {
  console.log(req.query.name);
  next();
};

module.exports = {
  validator,
};
