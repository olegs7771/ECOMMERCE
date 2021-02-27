const express = require('express');
const router = express.Router();

const { protect, restrictTo } = require('../controllers/authController');
const { protectGuest } = require('../controllers/guestController');

const { createOrder } = require('../controllers/orderController');

//Create order by guest

router.route('/:guestId').post(protectGuest, createOrder);

module.exports = router;
