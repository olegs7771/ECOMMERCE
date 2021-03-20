const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../controllers/authController');
const { update, read } = require('../controllers/ratingController');

// router.use(protect)

router.route('/:productId').post(protect, update);

module.exports = router;
