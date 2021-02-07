const express = require('express');
const router = express.Router();

const {
  checkUserEmailExists,
  signup,
  signOauth2,
  loginOauth2,
  confirm,
  login,
  protect,
  clearCookies,
} = require('../controllers/authController');

const {
  getGuestCookieToken,
  createGuestCart,
  protectGuest,
} = require('../controllers/guestController');

const {
  getUser,
  uploadAvatar,
  deleteUser,
} = require('../controllers/userController');

// ROUTES PUBLIC
router.route('/guest/:guestId').post(protectGuest, createGuestCart); //create guest cart
router.route('/').post(checkUserEmailExists).get(getGuestCookieToken);
router.route('/signup').post(signup);
router.route('/signupOauth2').post(signOauth2);
router.route('/loginOauth2').post(loginOauth2);
router.route('/confirm').post(confirm);
router.route('/login').post(login);
router.route('/clearCookies').get(clearCookies);

// router.use(protect);
router.route('/:id').get(protect, getUser);

//Upload Image Avatar by User
router.route('/photo').post(protect, uploadAvatar);
//DELETE USER BY USER
router.route('/').post(protect, deleteUser);

module.exports = router;
