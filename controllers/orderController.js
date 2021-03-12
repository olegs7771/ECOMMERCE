const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const asyncCatch = require('../utils/asyncCatch');
const AppErrorHandler = require('../utils/AppError');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Email = require('../utils/mail');

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
    total: req.body.total.toFixed(2),
    country: req.body.country,
    items: req.body.totalItems,
  };
  let data;
  let newOrder;

  if (typeof req.user === 'object') {
    //User
    //1) Create order for Guest
    data = {
      ...orderObj,
      userId: req.user._id,
    };
    //Check if user/guest already has Order created by cartId
    //Order Exists -> Update Order
    newOrder = await Order.findOneAndUpdate(
      { userId: req.user._id, payment: false },
      data,
      {
        runValidators: true,
        new: true,
      }
    );
    // if null than create new order
    if (!newOrder) {
      console.log('data to db ', data);
      newOrder = await Order.create(data);
    }
  } else {
    //Guest
    data = {
      ...orderObj,
      guestId: req.user,
    };
    //Check if user/guest already has order created by cartId
    //Order Exists -> Update Order
    console.log('update data', data);
    newOrder = await Order.findOneAndUpdate(
      { guestId: req.user, payment: false },
      data,
      {
        runValidators: true,
        new: true,
      }
    );

    // if null than create new order
    if (!newOrder) {
      console.log('data to db ', data);
      newOrder = await Order.create(data);
    }
  }
  res.status(200).json({ status: 'success', data: newOrder });
});

//MAKE PAYMENT INTENT
const paymentIntent = asyncCatch(async (req, res, next) => {
  console.log('req.user', req.user);
  console.log('req.body', req.body);
  console.log('payment intent');

  const payment = await stripe.paymentIntents.create({
    amount: Math.trunc(req.body.total),
    currency: 'cad',
    description: 'some description',
    payment_method: req.body.paymentMethod.id,
    confirm: true,
  });
  console.log('payment', payment);
  if (payment.id) {
    //PAYMENT SUCCEEDED
    // 1) UPDATE ORDER IN db
    const randomNum = Math.random().toString();
    let order;
    if (typeof req.user === 'object') {
      //User
      order = await Order.findOneAndUpdate(
        { userId: req.user._id, payment: false },
        {
          payment: true,
          paymentAt: Date.now(),
          paymentId: payment.id,
          orderNumber: randomNum.substring(randomNum.length - 10),
        },
        { runValidators: true, new: true }
      );
    } else {
      //Guest
      order = await Order.findOneAndUpdate(
        { guestId: req.user, payment: false },
        {
          payment: true,
          paymentAt: Date.now(),
          paymentId: payment.id,
          orderNumber: randomNum.substring(randomNum.length - 10),
        },
        { runValidators: true, new: true }
      );
    }

    //UPDATE CART AS PAID IN DB
    const cart = await Cart.findOneAndUpdate(
      { _id: order.cartId },
      { cartPaid: true },
      { new: true }
    );
    //Update Products (sold,quantity)

    cart.products.forEach(async (p) => {
      console.log('p', p);
      console.log('p.quantity', p.quantity);
      let product = await Product.findOneAndUpdate(
        { _id: p },
        { $inc: { instock: -p.quantity, sold: p.quantity } },
        { new: true }
      );
      console.log('product', product);
    });

    console.log('cart updated products', cart.products);

    //Send Email To Client with Receipt
    const data = {
      newUser: { user: `${order.fname} ${order.lname}`, email: order.email },
      url: 'https://some url', //use for link
      orderNumber: order.orderNumber,
      suit: order.suit,
      street: order.street,
      city: order.city,
      zipecode: order.zipcode,
      province: order.province,
      country: order.country,
      delivery_date: 'Mon 5 2021',
      delivery_time: '12:00',
      delivery: '10.00',
      items: order.items,
      product_price: '10.00',
      total: '20.00',
      products: cart.products,
    };

    await new Email(data).sendOrder();

    res.status(200).json({
      status: 'success',
      message: 'Thank you for purchase',
      data: order,
    });
  }
});

//GET ORDER AND CART FOR CHECKOUT page by orderId
const getOrder = asyncCatch(async (req, res, next) => {
  let order;

  if (typeof req.user === 'object') {
    //User
    order = await Order.findOne({ userId: req.user._id });
    console.log('order', order);
    if (!order) return next(new AppErrorHandler('No order found', 400));
    //Find Cart to show in receipt page
    const cart = await Cart.findById(order.cartId);
    if (!cart) return next(new AppErrorHandler('No cart found', 400));

    res.status(200).json({ status: 'success', data: { order, cart } });
  } else {
    //Guest
    order = await Order.findOne({ guestId: req.user });
    console.log('order', order);
    if (!order) return next(new AppErrorHandler('No order found', 400));
    //Find Cart to show in receipt page
    const cart = await Cart.findById(order.cartId);
    if (!cart) return next(new AppErrorHandler('No cart found', 400));

    res.status(200).json({ status: 'success', data: { order, cart } });
  }
});
//GET ORDER AND CART FOR USER DASHBOARD BY orderId
const getOrderById = asyncCatch(async (req, res, next) => {
  let order;

  order = await Order.findById(req.params.orderId);
  console.log('order', order);
  if (!order) return next(new AppErrorHandler('No order found', 400));
  //Find Cart to show in receipt page
  const cart = await Cart.findById(order.cartId);
  if (!cart) return next(new AppErrorHandler('No cart found', 400));

  res.status(200).json({ status: 'success', data: { order, cart } });
});

// GET ALL ORDERS TO SHOW IN MODAL DASHBOARD

const getAllOrders = asyncCatch(async (req, res, next) => {
  // 1)Fetch all existing orders for user
  // console.log('req.user', req.user);
  const orders = await Order.find({ userId: req.user._id });
  console.log(orders);
  res.status(200).json({ status: 'success', data: orders });
});

// TEST EMAIL
const testEmail = asyncCatch(async (req, res, next) => {
  const data = {
    newUser: { user: 'Oleg', email: 'someemail@gmai.com' },
    url: 'https://some url',
    orderNumber: '222222222222',
    suit: '2',
    street: 'Fox Meadow',
    city: 'Winnipeg',
    zipecode: '1V1 V1V',
    province: 'MN',
    country: 'Canada',
    delivery_date: 'Mon 5 2021',
    delivery_time: '12:00',
    delivery: '10.00',
    items: '2',
    product_price: '10.00',
    total: '20.00',
    products: [
      {
        quantity: 1,
        _id: '600c4d4d6fd9c538a4b16a60',
        product: {
          sold: 7,
          images: [Array],
          _id: '600c4d4d6fd9c538a4b16a60',
          title: 'LED light panel',
          description:
            'The light panel brings light to your darkest spaces – connect one or more and steer the light via your remote or smartphone. Dim up or down and set ',
          price: '39.99',
          shipping: 'Yes',
          color: 'White',
          brand: 'Microsoft',
          category: '5ffb1ebc87c4513a0c578ee6',
          sub: '5ffb26bdb83f1b1c20e18303',
          ratings: [],
          createdAt: '2021-01-23T16:22:37.945Z',
          updatedAt: '2021-03-12T06:40:14.619Z',
          slug: 'led-light-panel',
          __v: 3,
          instock: 13,
        },
      },
      {
        quantity: 2,
        _id: '600c4d4d6fd9c538a4b16a60',
        product: {
          sold: 7,
          images: [Array],
          _id: '600c4d4d6fd9c538a4b16a60',
          title: 'Light Wireless',
          description:
            'The light panel brings light to your darkest spaces – connect one or more and steer the light via your remote or smartphone. Dim up or down and set ',
          price: '59.99',
          shipping: 'Yes',
          color: 'White',
          brand: 'Microsoft',
          category: '5ffb1ebc87c4513a0c578ee6',
          sub: '5ffb26bdb83f1b1c20e18303',
          ratings: [],
          createdAt: '2021-01-23T16:22:37.945Z',
          updatedAt: '2021-03-12T06:40:14.619Z',
          slug: 'led-light-panel',
          __v: 3,
          instock: 13,
        },
      },
      {
        quantity: 2,
        _id: '600c270427be51376816705a',
        product: {
          sold: 3,
          images: [Array],
          _id: '600c270427be51376816705a',
          title: 'Wireless motion sensor1',
          description:
            "Now it's really easy for anyone to use smart lighting. With the remote you can control your light sources. Turn on, turn off, choose colors and warm or cold light – and dim for the right mood.",
          price: '100.50',
          shipping: 'Yes',
          color: 'White',
          brand: 'Microsoft',
          category: '5ffb1ebc87c4513a0c578ee6',
          sub: '5ffb26bdb83f1b1c20e18303',
          ratings: [],
          createdAt: '2021-01-23T13:39:16.489Z',
          updatedAt: '2021-03-10T11:10:52.615Z',
          slug: 'wireless-motion-sensor1',
          __v: 5,
          instock: 17,
        },
      },
    ],
  };

  await new Email(data).sendOrder();
});

module.exports = {
  createOrder,
  getOrder,
  paymentIntent,
  getAllOrders,
  getOrderById,
  testEmail,
};
