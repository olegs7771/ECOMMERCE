const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const asyncCatch = require('../utils/asyncCatch');
const AppErrorHandler = require('../utils/AppError');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const { findOneAndUpdate } = require('../models/Order');

//Create Order By Guest/User
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
    total: req.body.total,
  };
  let data;
  let newOrder;

  if (typeof req.user === 'object') {
    //User
    //1) Create order for Guest
    data = {
      ...orderObj,
      usertId: req.user._id,
    };
  } else {
    //Guest
    data = {
      ...orderObj,
      guestId: req.user,
    };
    //Check if user/guest already has order created by cartId
    // const order = await Order.findOne({cartId:req.body.cartId})
    // if(order){
    //Order Exists -> Update Order

    newOrder = await Order.findOneAndUpdate({ cartId: req.body.cartId }, data);
    // }
    // if null than create new order
    if (!newOrder) {
      newOrder = await Order.create(data);
    }
  }
  //GET Cart
  const cart = await Cart.findById(req.body.cartId);
  if (!cart) return next(new AppErrorHandler('cart not found', 400));
  res.status(200).json({ status: 'success', data: newOrder, cart });
});

module.exports = { createOrder };
