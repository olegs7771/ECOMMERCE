const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../controllers/authController');
const { update } = require('../controllers/ratingController');

// router.use(protect)

router.route('/:userId/:productId').post(protect, update);

module.exports = router;
