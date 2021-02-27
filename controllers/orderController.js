const asyncCatch = require('../utils/asyncCatch');
const AppErrorHandler = require('../utils/AppError');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

//Create Order By Guest
const createOrder = asyncCatch(async (req, res, next) => {
  console.log('Create order');
  console.log('req.user', req.user);
  const orderObj = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    city: req.body.city,
    suit: req.body.suit,
    street: req.body.street,
    phone: req.body.phone,
    zipcode: req.body.zipcode,
    fname: req.body.fname,
  };
  let order;
  if (typeof req.user === 'object') {
    //User
    //1) Create order for Guest
    order = await Order.create({
      ...orderObj,
      usertId: req.user._id,
    });
  } else {
    //Guest
    order = await Order.create({
      ...orderObj,
      guestId: req.user,
    });
  }
  console.log('order', order);
  res.status(200).json({ status: 'success', data: order });
});

module.exports = { createOrder };
