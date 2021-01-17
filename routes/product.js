const express = require('express');
const router = express.Router();

const { protect, restrictTo } = require('../controllers/authController');

const {
  create,
  list,
  getOne,
  update,
  getAll,
  removeOne,
  removeAllByCategoryId,
  removeAllBySubId,
  uploadImage,
} = require('../controllers/productController');

router.use(protect, restrictTo('admin'));

router.route('/image').post(uploadImage); //upload image
router.route('/').post(create).get(getAll); // create one product
router.route('/:subId').get(list); // get products by subId
router.route('/category/:categoryId/').delete(removeAllByCategoryId); //delete product by categoryId
router.route('/sub/:subId/').delete(removeAllBySubId); //delete product by subId
router.route('/:productId/:slug').get(getOne).delete(removeOne).put(update); //get one product by productId && slug//delete product by id && slug
module.exports = router;
