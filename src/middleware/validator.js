const validator = (req, res, next) => {
  console.log('validating...');
  if(!req.params.name){
    throw new Error('No query');
  }
  console.log('VALID');
  next();
};

module.exports = {
  validator,
};
