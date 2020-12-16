// Authentication process:
// 1) Uses Signing in --> receives token
// 2) User Login in with email and password

const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncCatch = require('../utils/asyncCatch');
const AppErrorHandler = require('../utils/AppError');
const Email = require('../utils/mail');

//Create res object with token for cookies

const createSendToken = (user, statusCode, req, res) => {
  // CREATE PAYLOAD FOR TOKEN
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.JWT_TOKEN_EXP), //2d
  });
  //Send token to cookies
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXP * 24 * 60 * 60 * 1000 //2d
    ),
    // maxAge: parseInt(process.env.JWT_COOKIE_EXP, 10), ///60s
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });
  res.status(statusCode).json({ status: 'success', token, data: user });
};

//CONTROLLERS

// SIGNIN
const signup = asyncCatch(async (req, res, next) => {
  console.log('req.body', req.body);

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password1,
    passwordConfirm: req.body.password2,
  });

  const url = `${req.protocol}://${req.get('host')}`;
  console.log('url', url);
  // //SEND EMAIL WITH CONFIRMATION LINK
  await new Email(newUser, url).sendWelcome();

  createSendToken(newUser, 200, req, res);
});

//CONFIRM USER ACCOUNT BY EMAIL LINK
const confirm = asyncCatch(async (req, res, next) => {
  console.log('req.params', req.params);
  const user = await User.findById(req.params.id);
  user.createConfirmationToken();
});

//////////////////////////////////////////////////////////////////
//  LOGIN
const login = asyncCatch(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) check if email and password exists in body
  if (!email || !password)
    return next(new AppErrorHandler('no empty fields', 400));
  const user = await User.findOne({ email });
  console.log('user', user);

  // 2) check if user exists and password is correct
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppErrorHandler('Incorrect email or password', 401));

  // 3) if everything is ok , send token to user
  // createSendToken = (user, statusCode, req, res)
  createSendToken(user, 200, req, res);
});

//PROTECTION OF ROUTES

const protect = asyncCatch(async (req, res, next) => {
  // console.log('req.headers protect', req.headers);
  console.log('protect');
  // 1) Check if token exists
  let token;
  // TOKEN IN HEADER AUTHORIZATION !!! USING ONLY TOKEN IN COOKIES FOR MORE PROTECTION
  // TOKEN IN localStorage USING ONLY FOR REACT STORE USAGE

  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith('Bearer')
  // ) {
  //   token = req.headers.authorization.split(' ')[1];
  // }
  // TOKEN IN COOKIE
  if (req.headers.cookie && req.headers.cookie.startsWith('jwt')) {
    console.log('token', token);
    token = req.headers.cookie.substring(4);
  }
  // console.log('token', token);
  if (!token)
    return next(
      new AppErrorHandler(
        'You are not logged in! Please log in to proceed',
        401
      )
    );
  // 2) Check if token signature is valid

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log('decoded', decoded);

  // 3) Check if user still exists
  const user = await User.findById(decoded.id);
  if (!user)
    return next(new AppErrorHandler('User  not exists .Please sign up.', 401));

  if (user && !user.active)
    return next(new AppErrorHandler('User was deleted. Please sign up.', 401));

  // 4) Check if user changed password fter token was issued
  // Using Instance method in Model User
  //if returned true passwordChangedAt > tokenTimeStampItp
  if (user.changedPassword(decoded.iat)) {
    return next(
      new AppErrorHandler('User authentication expired. Please sign up.', 401)
    );
  }

  next();
});

module.exports = { signup, confirm, login, protect };
