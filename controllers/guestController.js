const Guestcart = require('../models/Guestcart');
const asyncCatch = require('../utils/asyncCatch');
const AppErrorHandler = require('../utils/AppError');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { promisify } = require('util');
const { findOne } = require('../models/Guestcart');

// ON LOADING APP GET sessionId,userId,token TO COOKIES
const getGuestCookieToken = asyncCatch(async (req, res, next) => {
  const sessionId = crypto.randomBytes(10).toString('hex');
  const userId = uuidv4();
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

// CHECK IF GUEST HAS VALID TOKEN
const protectGuest = asyncCatch(async (req, res, next) => {
  console.log('protect');
  console.log('req.headers', req.headers);
  let token;
  if (req.headers.cookie.startsWith('guest')) {
    console.log('true');
    token = req.headers.cookie.split('; ')[0].substring(6);
    console.log('token', token);
    // 1) check if token valif
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log('decoded', decoded);
    console.log('req.params.guestId', req.params.guestId);
    if (decoded.sub === req.params.guestId) {
      console.log('true');
      //Token Valid 👍
      // ADD TO req object userId
      req.user = req.params.guestId;
      next();
    } else {
      next(new AppErrorHandler('guest not valid', 400));
    }
  } else {
    next(new AppErrorHandler('No valid guest token'));
  }
});

// CREATE GUEST CART by adding one product
const createGuestCart = asyncCatch(async (req, res, next) => {
  console.log('req.body createGuestCart', req.body);
  //1) Check if guest already has Cart
  const cart = await Guestcart.findOne({ guestId: req.user });
  if (cart) {
    //  UPDATE CART add more products
    cart.addProduct(req.body.productId);
    await cart.save();
    res.status(200).json({ data: cart });

    console.log('cart exists');
  } else {
    console.log('req.user', req.user);
    const cart = await Guestcart.create({
      guestId: req.user,
      products: req.body.productId,
    });
    res.status(200).json({ status: 'success', data: cart });
  }
});

// REMOVE PRODUCT FROM CRATE (update)
const removeProduct = asyncCatch(async (req, res, next) => {
  // 1)Find cart
  const cart = await Guestcart.findOne({ guestId: req.user });
  cart.removeProduct(req.body.productId);
  await cart.save();
  res.status(200).json({ status: 'success', data: cart });
});

// DELETE CART IF userId EXPIRED IN cookie
const deleteCart = asyncCatch(async (req, res, next) => {
  console.log('delete cart');
});

module.exports = {
  getGuestCookieToken,
  protectGuest,
  createGuestCart,
  removeProduct,
  deleteCart,
};
