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
  deleteImage,
  lastAdded,
} = require('../controllers/productController');

// PUBLIC ROUTES
router.route('/last-added').get(lastAdded); // get last added products for home page

router.use(protect, restrictTo('admin'));
//PROTECTED ROUTES
router.route('/image').post(uploadImage).delete(deleteImage); //upload image
router.route('/').post(create).get(getAll); // create one product
router.route('/:subId').get(list); // get products by subId
router.route('/category/:categoryId/').delete(removeAllByCategoryId); //delete product by categoryId
router.route('/sub/:subId/').delete(removeAllBySubId); //delete product by subId
router.route('/:productId/:slug').get(getOne).delete(removeOne).put(update); //get one product by productId && slug//delete product by id && slug
module.exports = router;
