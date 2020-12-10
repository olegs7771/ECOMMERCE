// const AppErrorClass = require('../utils/AppError');

module.exports = (err, req, res, next) => {
  //define error status code if there no status
  // 500 internal server error
  // define error status as well

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  console.log('err :', err);
  // console.log('err.stack', err.stack);
  // console.log('err.name', err.name);

  res.status(err.statusCode).json({ status: err.status, message: err.message });
};
