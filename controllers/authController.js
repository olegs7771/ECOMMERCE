const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncCatch = require('../utils/asyncCatch');

exports.signup = asyncCatch(async (req, res, next) => {
  console.log('req.body', req.body);

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  next();
});
