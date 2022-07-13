//Sends a 404/Not-Found message as the response
//Import this into your server and set it up to be "used" after your other routes

const handle404Error = (req, res, next) => {
  const errorObject = {
    status: 404,
    message: '404 Error! This really stinks.',
  };
  res.status(404).json(errorObject);
};

module.exports = {
  handle404Error,
};
