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
const GoogleAuth = require('../utils/GoogleAuth');

//FIND IN COOKIES JWT token

const findJwtToken = (cookies) => {
  const jwtTokenStr = cookies
    .split(';')
    .filter((el) => el.trim().startsWith('jwt'))[0];

  return jwtTokenStr.split('=')[1];
};

//Create res object with token for cookies
const createSendToken = (user, statusCode, message, req, res) => {
  // CREATE PAYLOAD FOR TOKEN
  const payload = {
    id: user._id,
    name: user.user,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.JWT_TOKEN_EXP), //2d
  });
  //Send token to cookies
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXP, 10) * 24 * 60 * 60 * 1000
    ),
    // maxAge: parseInt(process.env.JWT_COOKIE_EXP, 10), ///60s
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    sameSite: true,
  });
  res
    .status(statusCode)
    .json({ status: 'success', message, token, data: user });
};

//CONTROLLERS 🏁

// CHECK IF EMAIL  EXISTS FOR MOUSE LEAVE
const checkUserEmailExists = asyncCatch(async (req, res, next) => {
  console.log('req.body in check', req.body);
  const user = await User.findOne({ email: req.body.email });
  if (user)
    return next(new AppErrorHandler(`Email ${user.email} already in use`));
  res.status(200).json({ status: 'success' });
});

/////////////////////////////////////////////////////
// SINGN WITH GOOGLE

const signOauth2 = asyncCatch(async (req, res, next) => {
  // CHECK FOR INCOMING BODY req.body.tokeId
  if (!req.body.tokenId && !req.body.tokenId.startsWith('eyJhbG'))
    return next(new AppErrorHandler('Registration failed'));
  const payload = await GoogleAuth(req.body.tokenId);
  console.log('payload', payload);

  // 2) CHECK IF USER  EXISTS
  const user = await User.findOne({ email: payload.email });
  console.log('user', user);
  if (user) {
    // // 2) CHECK IF USER ACTIVE (not deleted)
    // // IF USER WAS DELETED THEN WE UPDATE ACTIVE:true
    if (!user.active) {
      user.active = true;
      user.save({ validateBeforeSave: false });
      return createSendToken(user, 200, `Welcome back ${user.user}`, req, res);
    }
    // // IF USER ALREDY IN DB ===> ERROR TO CLIENT
    if (user.active)
      return next(
        new AppErrorHandler(
          `User ${payload.email} already exists in database.Please log in`
        )
      );
  } else {
    // USER NOT EXISTS IN DB
    // //PERFORM SIGNUP WITH oAUth2 WITHOUT CONFIRMATION
    //PASSWORD WE TAKE USER GOOGLE ID

    const newUser = await User.create({
      uname: payload.name,
      email: payload.email,
      password: payload.sub,
      passwordConfirm: payload.sub,
      avatar: payload.picture,
      active: true,
      activatedByEmail: true,
      createdByOauth2: true,
    });

    // //LOGIN INSTANTLY
    const message = 'Registration Successful.';
    createSendToken(newUser, 200, message, req, res);
  }
});

// LOGIN WITH OAUTH2

const loginOauth2 = asyncCatch(async (req, res, next) => {
  console.log('req.body loginOauth2', req.body);

  try {
    const payload = await GoogleAuth(req.body.tokenId);
    console.log('payload', payload);
    // // 1) CHECK IF USER EXISTS
    const user = await User.findOne({ email: payload.email });
    console.log('user', user);
    // LOG ONLY IF USER WAS CREATED WITH OAUTH2
    if (!user.createdByOauth2 || !user)
      return next(new AppErrorHandler(`User ${payload.email} not found`));
    if (!user.active) return next(new AppErrorHandler('User was deleted', 400));
    //LOGIN USER
    const message = 'Login Successful.';
    createSendToken(user, 200, message, req, res);
  } catch (err) {
    console.log('payload error in login oauth2', err);
  }
});

// SIGNIN WITH FORM
const signup = asyncCatch(async (req, res, next) => {
  console.log('req.body', req.body);

  const newUser = await User.create({
    user: req.body.user,
    email: req.body.email,
    password: req.body.password1,
    passwordConfirm: req.body.password2,
  });

  const { id, token } = await newUser.createConfirmationToken();

  console.log('token create in signup', token);
  await newUser.save({ validateBeforeSave: false }); //save token temporary to the DB
  //  URL CONTAINS ID AND CONFIRM TOKEN AS PARAMS
  // const url = `${req.protocol}://${req.get(
  //   'host'
  // )}/api/v1/users/confirm/${id}/${token}`;
  //  REDIRECT TO REACT CONFIRMATION PAGE
  let url;
  if (process.env.NODE_ENV === 'development') {
    url = `http://127.0.0.1:3000/confirm/${id}/${token}`;
  }

  console.log('url', url);
  // //SEND EMAIL WITH CONFIRMATION LINK
  console.log('newUser', newUser);
  const data = {
    newUser,
    url,
  };
  await new Email(data).sendWelcome();

  const message = `User ${req.body.user} was created. 
  Pleace check your email ${req.body.email} `;
  res.status(200).json({ status: 'success', message });
});

/////////////////////////////////////////////////////////////////////
//CONFIRM USER ACCOUNT BY EMAIL LINK
const confirm = asyncCatch(async (req, res, next) => {
  console.log('req.body', req.body);
  // 1) FIND USER
  const user = await User.findById(req.body.id);
  // 2) CHECK IF USER ALREADY ACTIVATED VIA EMAIL
  if (user.activatedByEmail)
    return next(new AppErrorHandler('User alredy activated', 400));

  if (!user || !user.compareToken(req.body.token))
    return next(
      new AppErrorHandler(
        'User not found or registration been expired.Please repeat signup',
        404
      )
    );

  // 3)UPDATE USER  IN DB
  user.activatedByEmail = true;
  user.confirmationToken = undefined;
  await user.save({ validateBeforeSave: false });

  console.log('user', user);
  res.json({ message: 'Please sign in using your credentials' });
});

//////////////////////////////////////////////////////////////////
//  LOGIN
const login = asyncCatch(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) check if email and password exists in body
  if (!email || !password)
    return next(new AppErrorHandler('no empty fields', 400));
  const user = await User.findOne({ email });
  // 2) CHECK IF USER EXISTS IN DB
  if (!user) return next(new AppErrorHandler('Such a user not exists!'));
  // 3)CHECK IF USER ACTIVE
  if (!user.active)
    return next(
      new AppErrorHandler('Account was deleted.Please sign up again', 400)
    );
  // 4)CHECK IF USER ACTIVATED BY EMAIL
  if (!user.activatedByEmail)
    return next(new AppErrorHandler('Account still not activated', 400));

  // 5) check if user exists and password is correct
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppErrorHandler('Incorrect email or password', 401));

  // 6) if everything is ok , send token to user
  // createSendToken = (user, statusCode, req, res)
  const message = 'Login succefull';
  createSendToken(user, 200, message, req, res);
});

//PROTECTION OF ROUTES

const protect = asyncCatch(async (req, res, next) => {
  // console.log('req.headers protect', req.headers);

  // 1) Check if token exists
  let token;
  // TOKEN IN HEADER AUTHORIZATION !!! USING ONLY TOKEN IN COOKIES FOR MORE PROTECTION
  // TOKEN IN localStorage USING ONLY FOR REACT STORE USAGE

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // TOKEN IN COOKIE

  if (req.headers.cookie) {
    token = findJwtToken(req.headers.cookie); //function filters all cookies object for jwt token
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

  // STORE FOUND USER IN req OBJECT PIPELINE
  req.user = user;
  res.locals.user = user;
  console.log('protected');
  next();
});

// RESTRICTED ROUTER ONLY FOR ADMIN
const restrictTo = (...roles) => {
  console.log('restrictTo admin');
  return (req, res, next) => {
    // console.log('restricted req.user', req.user);
    if (!roles.includes(req.user.role))
      return next(new AppErrorHandler('Access restricted. Only for admin'));
    next();
  };
};

const clearCookies = asyncCatch(async (req, res, next) => {
  console.log('req.headers', req.headers.cookie.split(';')[1]);
  console.log(!req.headers.cookie && !req.headers.cookie.split(';')[1]);
  if (!req.headers.cookie && !req.headers.cookie.split(';')[1]) return next();
  console.log('send cookie');
  res.cookie('jwt', 'delete', {
    httpOnly: true,
  });
  res.json({ message: 'logged out' });
});

module.exports = {
  checkUserEmailExists,
  signup,
  signOauth2,
  loginOauth2,
  confirm,
  login,
  protect,
  restrictTo,
  clearCookies,
};
