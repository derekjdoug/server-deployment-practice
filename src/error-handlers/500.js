//Sends a 500/Server-Error message as the response
//Import this into your server and set it up to be "used" as the last route

const handle500Error = (err, req, res, next) => {
  const error = err.message;

  const errorObject = {
    status: 500,
    message: error,
  };
  res.status(500).json(errorObject);
};

module.exports = {
  handle500Error,
};
