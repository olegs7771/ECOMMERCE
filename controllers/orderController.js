const asyncCatch = require('../utils/asyncCatch');
const AppErrorHandler = require('../utils/AppError');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

//Create Order By Guest
const createOrder = asyncCatch(async (req, res, next) => {
  console.log('Create order');
  console.log('req.user', req.user);
  //1) Create order for Guest
  const order = await Order.create({
    guestId: req.user,
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    city: req.body.city,
    suit: req.body.suit,
    street: req.body.street,
    phone: req.body.phone,
    zipcode: req.body.zipcode,
    fname: req.body.fname,
  });
  console.log('order', order);
});

module.exports = { createOrder };
