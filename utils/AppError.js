//This class will handle all OPERATIONAL ERRORS

class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // calls  Class Error who has build-in only 1 param

    this.statusCode = statusCode;
    //if statusCode 404 than status fail !
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    //all errors operational
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;
