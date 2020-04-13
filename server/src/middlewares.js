const HttpStatus = require("http-status-codes");

const notFound = (req, res, next) => {
  res.status(HttpStatus.NOT_FOUND);
  next(new Error(`the requested route at ${req.originalUrl} was not found`));
};

const errorHandler = (err, req, res, next) => {
  const statusCode =
    res.statusCode === 200 ? HttpStatus.INTERNAL_SERVER_ERROR : res.statusCode;
  let responseObj = {
    message: err.message,
  };
  // if we're not running in prod, attach the stack trace
  if (process.env.NODE_ENV != "production") {
    responseObj = {
      ...responseObj,
      stack: err.stack,
    };
  }
  res.status(statusCode);
  res.json(responseObj);
};

module.exports = {
    notFound,
    errorHandler,
};
