const asyncCatch = require('../utils/asyncCatch');
const AppErrorHandler = require('../utils/AppError');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { promisify } = require('util');

//FIND IN COOKIES JWT token
const findJwtToken = (cookies) => {
  const jwtTokenStr = cookies
    .split(';')
    .filter((el) => el.trim().startsWith('guest'))[0];
  return jwtTokenStr.split('=')[1];
};

// ON LOADING APP GET sessionId,userId,token TO COOKIES
const getGuestCookieToken = asyncCatch(async (req, res, next) => {
  const sessionId = crypto.randomBytes(10).toString('hex');
  const guestId = uuidv4();
  const payload = {
    sub: guestId,
    iss: `${req.protocol}://${req.get('host')}`,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_COOKIE_EXP_GUEST, //70d
  });

  //Send token to cookies
  res.cookie('guest', token, {
    expires: new Date(
      Date.now() +
        parseInt(process.env.GUEST_COOKIE_EXP, 10) * 24 * 60 * 60 * 1000
    ),
    // maxAge: parseInt(process.env.GUEST_COOKIE_EXP, 10), ///60s
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    sameSite: true,
  });
  res.cookie('sessionId', sessionId, {
    expires: new Date(
      Date.now() +
        parseInt(process.env.GUEST_COOKIE_EXP, 10) * 24 * 60 * 60 * 1000
    ),
    // maxAge: parseInt(process.env.GUEST_COOKIE_EXP, 10), ///60s
    // httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    sameSite: true,
  });
  res.cookie('cart_exp', guestId, {
    expires: new Date(
      Date.now() +
        parseInt(process.env.CART_COOKIE_EXP, 10) * 24 * 60 * 60 * 1000 //30d
    ),
    // maxAge: parseInt(process.env.GUEST_COOKIE_EXP, 10), ///60s
    // httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    sameSite: true,
  });
  res.cookie('guestId', guestId, {
    expires: new Date(
      Date.now() +
        parseInt(process.env.GUEST_COOKIE_EXP, 10) * 24 * 60 * 60 * 1000
    ),
    // maxAge: parseInt(process.env.JWT_COOKIE_EXP, 10), ///60s
    // httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    sameSite: true,
  });
  res.status(200).json({ status: 'success', token, data: sessionId, guestId });
});

// CHECK IF GUEST HAS VALID TOKEN
const protectGuest = asyncCatch(async (req, res, next) => {
  // console.log('protect');
  // console.log('req.headers', req.headers);

  if (req.headers.cookie) {
    const token = findJwtToken(req.headers.cookie);
    // console.log('token', token);
    // 1) check if token valif
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // console.log('decoded', decoded);
    // console.log('req.params.guestId', req.params.guestId);
    if (decoded.sub === req.params.guestId) {
      //Token Valid 👍
      // ADD TO req object guestId
      req.user = req.params.guestId;
      next();
    } else {
      console.log();
      next(new AppErrorHandler('guest not valid', 400));
    }
  } else {
    next(new AppErrorHandler('No valid guest token', 400));
  }
});

module.exports = {
  getGuestCookieToken,
  protectGuest,
};
