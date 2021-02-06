const asyncCatch = require('../utils/asyncCatch');
const AppErrorHandler = require('../utils/AppError');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { uuid } = require('uuidv4');

// ON LOADING APP GET sessionId,userId,token TO COOKIES
const getGuestCookieToken = asyncCatch(async (req, res, next) => {
  const sessionId = crypto.randomBytes(10).toString('hex');
  const userId = uuid();
  const payload = {
    sub: userId,
    iss: `${req.protocol}://${req.get('host')}`,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.JWT_TOKEN_EXP), //2d
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
  res.cookie('userId', userId, {
    expires: new Date(
      Date.now() +
        parseInt(process.env.GUEST_COOKIE_EXP, 10) * 24 * 60 * 60 * 1000
    ),
    // maxAge: parseInt(process.env.JWT_COOKIE_EXP, 10), ///60s
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    sameSite: true,
  });
  res.status(200).json({ status: 'success', token, data: sessionId, userId });
});

module.exports = { getGuestCookieToken };
