const express = require('express');
const router = express.Router();

const { protect, restrictTo } = require('../controllers/authController');
const { protectGuest } = require('../controllers/guestController');

const { createOrder, getOrder } = require('../controllers/orderController');

//Create order by guest
router.route('/user/:userId').post(protect, createOrder).get(protect, getOrder);

//Create order by guest
router
  .route('/guest/:guestId')
  .post(protectGuest, createOrder)
  .get(protectGuest, getOrder);

module.exports = router;
