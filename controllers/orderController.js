const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const asyncCatch = require('../utils/asyncCatch');
const AppErrorHandler = require('../utils/AppError');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

//Create Order By Guest
const createOrder = asyncCatch(async (req, res, next) => {
  console.log('Create order');
  console.log('req.user', req.user);
  console.log('req.body', req.body);
  const orderObj = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    province: req.body.province,
    city: req.body.city,
    suit: req.body.suit,
    street: req.body.street,
    phone: req.body.phone,
    zipcode: req.body.zipcode,
    fname: req.body.fname,
    cartId: req.body.cartId,
  };
  let order;
  if (typeof req.user === 'object') {
    //User
    //1) Create order for Guest
    order = {
      ...orderObj,
      usertId: req.user._id,
    };
  } else {
    //Guest
    order = {
      ...orderObj,
      guestId: req.user,
    };
  }
  console.log('order', order);
  //Find Cart
  const cart = await Cart.findById(req.body.cartId);
  if (!cart) return next(new AppErrorHandler('cart not found', 400));
  console.log('cart.products ', cart.products);

  //Create products line_items for STRIPE

  // success_url: `${req.protocol}://${req.get('host')}/my-tours`,
  console.log(req.get('host'));
  //CREATE STRIPE SESSION
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'cad',
          product_data: {
            name: 'Stubborn Attachments',
            images: ['https://i.imgur.com/EHyR2nP.png'],
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}/checkout`,
    cancel_url: `${req.protocol}://${req.get('host')}/`,
  });
  console.log('session', session);

  res.status(200).json({ status: 'success', data: cart });
});

module.exports = { createOrder };
