// const AppErrorClass = require('../utils/AppError');

const sendErrorDev = (err, res) => {
  console.log('err in errorController', err);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  console.log('err in prod', err);
  //only oprational errors leaked to client!
  if (err.isOperational) {
    console.log('err operational');
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
    });
  } else {
    // unknown errors

    console.error('ERROR ❗', err);
    res.status(500).json({
      status: 'error',
      message: 'not operational error in prod',
      error: err,
    });
  }
};

module.exports = (err, req, res, next) => {
  //define error status code if there no status
  // 500 internal server error
  // define error status as well

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  // console.log('err :', err);
  /////////DEV//////////////
  //////////////////////////
  if (process.env.NODE_ENV === 'development') {
    console.log('err ❗', err);
    sendErrorDev(err, res);
    ////////////////////////////
    ///////////////////////////
    ///////////PROD///////////////////
  } else if (process.env.NODE_ENV === 'production') {
    console.log('err in prod ❗', err);
    ///////////////////////////////////
    //Handle Mongoose Errors in Prod
    // For CastError if wrong id param
    if (err.name === 'CastError') {
      return res.status(404).json({
        status: 'error',
        error: ` ${err.stringValue} Not found on this server`,
      });
    }
    //HANDLE VALIDATION MONGOOSE ERRORS
    if (err.name === 'ValidationError') {
      return res.status(404).json({
        status: 'error',
        message: err.message,
      });
    }
    //HANDLE VALIDATION MONGOOSE DUBLICATE FIELDS

    if (err.name === 'MongoError') {
      //EMAIL IN MODEL UNIQUE
      if (Object.keys(err.keyValue)[0] === 'email') {
        return res.status(404).json({
          status: 'error',
          message: 'User with such email already exists',
        });
      }
    }
    //HANDLE VALIDATION JWT VALIDATION ERROR

    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'fail',
        message: 'Authentication failed. Please log in!',
      });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'fail',
        message: 'Authentication expired. Please log in!',
      });
    }

    sendErrorProd(err, res);
  }
};
