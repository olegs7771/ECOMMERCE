const express = require('express');
const router = express.Router();

const {
  signup,
  confirm,
  login,
  protect,
} = require('../controllers/authController');
const {
  getUser,
  uploadAvatar,
  deleteUser,
} = require('../controllers/userController');

router.route('/signup').post(signup);
router.route('/confirm').post(confirm);
router.route('/login').post(login);

// router.use(protect);
router.route('/:id').get(protect, getUser);

//Upload Image Avatar by User
router.route('/photo').post(protect, uploadAvatar);
//DELETE USER BY USER
router.route('/').post(deleteUser);

module.exports = router;
