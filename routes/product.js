const express = require('express');
const router = express.Router();

const { protect, restrictTo } = require('../controllers/authController');
router.use(protect, restrictTo('admin'));
router.route('/').post(create);

module.exports = router;
