const express = require('express');
const router = express.Router();

const { protect, restrictTo } = require('../controllers/authController');
const { protectGuest } = require('../controllers/guestController');

const {
  createOrder,
  getOrder,
  paymentIntent,
  getAllOrders,
} = require('../controllers/orderController');

// User Order
router.route('/user/:userId').post(protect, createOrder).get(protect, getOrder);
router.route('/user/orders/:userId').get(protect, getAllOrders); //show all users orders
router.route('/user/payment/:userId').post(protect, paymentIntent);

// Guestr Order
router
  .route('/guest/:guestId')
  .post(protectGuest, createOrder)
  .get(protectGuest, getOrder);

router.route('/guest/payment/:guestId').post(protectGuest, paymentIntent);

module.exports = router;
