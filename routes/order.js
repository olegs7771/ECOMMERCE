const express = require('express');
const router = express.Router();

const { protect, restrictTo } = require('../controllers/authController');
const { protectGuest } = require('../controllers/guestController');

const {
  createOrder,
  getOrder,
  paymentIntent,
  getAllOrders,
  getOrderById,
  testEmail,
} = require('../controllers/orderController');

//TEST MANIPULATE PRODUCTS
router.route('/testEmail').post(testEmail);
// User Order
router
  .route('/user/:userId/')
  .post(protect, createOrder)
  .get(protect, getOrder); // getOrderAction
router.route('/user/orders/:userId').get(protect, getAllOrders); //show all users orders
router.route('/user/payment/:userId').post(protect, paymentIntent);
router.route('/order/:userId/:orderId').get(protect, getOrderById);

// Guestr Order
router
  .route('/guest/:guestId')
  .post(protectGuest, createOrder)
  .get(protectGuest, getOrder);

router.route('/guest/payment/:guestId').post(protectGuest, paymentIntent);

module.exports = router;
