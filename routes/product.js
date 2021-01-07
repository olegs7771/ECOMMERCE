const express = require('express');
const router = express.Router();

const { protect, restrictTo } = require('../controllers/authController');

const {
  create,
  list,
  getOne,
  getAll,
} = require('../controllers/productController');

router.use(protect, restrictTo('admin'));
router.route('/slug/:slug').get(getOne); //get one product by slug
router.route('/').post(create).get(getAll); // create one product
router.route('/:subId').get(list); // get products by subId

module.exports = router;
