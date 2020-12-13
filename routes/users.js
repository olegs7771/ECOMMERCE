const express = require('express');
const router = express.Router();

const { signup, login, protect } = require('../controllers/authController');
const { getUser, uploadAvatar } = require('../controllers/userController');

router.route('/signup').post(signup);
router.route('/login').post(login);

// router.use(protect);
router.route('/:id').get(protect, getUser);

//Upload Image Avatar by User
router.route('/:id/photo').post(protect, uploadAvatar);

module.exports = router;
