const express = require('express');
const router = express.Router();

const { protect, restrictTo } = require('../controllers/authController');
const { protectGuest } = require('../controllers/guestController');

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
  createCart,
  getProductsCart,
  deleteCart,
  updateProduct,
  removeProduct,
} = require('../controllers/productController');

// PUBLIC ROUTES
router.route('/last-added').get(lastAdded); // get last added products for home page

//Protect Guest VALIDATED ROUTES if guest token valid
router
  .route('/cart/:guestId')
  .post(protectGuest, createCart)
  .delete(protectGuest, deleteCart)
  .put(protectGuest, updateProduct)
  .get(protectGuest, getProductsCart)
  .patch(protectGuest, removeProduct);
router.route('/:subId').get(list); // get products by subId
router.route('/:productId/:slug').get(getOne); //get one product

// PROTECTED USER VALIDATED ROUTES  if user token Valid
router
  .route('/cart/user/:userId')
  .get(protect, getProductsCart)
  .post(protect, createCart)
  .put(protect, updateProduct)
  .patch(protect, removeProduct)
  .delete(protect, deleteCart);

router.use(protect, restrictTo('admin'));
//PROTECTED ROUTES
router.route('/image').post(uploadImage).delete(deleteImage); //upload image
router.route('/').post(create).get(getAll); // create one product
router.route('/category/:categoryId/').delete(removeAllByCategoryId); //delete product by categoryId
router.route('/sub/:subId/').delete(removeAllBySubId); //delete product by subId
router.route('/:productId/:slug').delete(removeOne).put(update); //get one product by productId && slug//delete product by id && slug
module.exports = router;
