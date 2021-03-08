const express = require('express');
const router = express.Router();

const { protect, restrictTo } = require('../controllers/authController');
const { protectGuest } = require('../controllers/guestController');

const {
  createCart,
  getProductsCart,
  deleteCart,
  updateProduct,
  removeProduct,
  getCartById,
} = require('../controllers/cartController');

// PROTECTED USER VALIDATED ROUTES  if user token Valid
router
  .route('/user/:userId')
  .get(protect, getProductsCart)
  .post(protect, createCart)
  .put(protect, updateProduct)
  .patch(protect, removeProduct)
  .delete(protect, deleteCart);

//Protect Guest VALIDATED ROUTES if guest token valid
router
  .route('/:guestId')
  .post(protectGuest, createCart)
  .delete(protectGuest, deleteCart)
  .put(protectGuest, updateProduct)
  .get(protectGuest, getProductsCart)
  .patch(protectGuest, removeProduct);

module.exports = router;
