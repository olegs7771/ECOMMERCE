const asyncCatch = require('../utils/asyncCatch');
const User = require('../models/User');
const AppError = require('../utils/AppError');

exports.getUser = asyncCatch(async (req, res, next) => {
  console.log('req.params', req.params);
  const user = await User.findById(req.params.id);

  //Using class for errors
  if (!user) return next(new AppError(`User not found`, 404));

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
