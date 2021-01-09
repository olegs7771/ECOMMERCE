const express = require('express');
const router = express.Router();

const { protect, restrictTo } = require('../controllers/authController');

const {
  create,
  list,
  getOne,
  getAll,
  removeOne,
} = require('../controllers/productController');

router.use(protect, restrictTo('admin'));
router.route('/:productId/:slug').get(getOne); //get one product by productId && slug
router.route('/').post(create).get(getAll); // create one product
router.route('/:subId').get(list); // get products by subId
router.route('/:productId/:slug').delete(removeOne); //delete product by id && slug

module.exports = router;
