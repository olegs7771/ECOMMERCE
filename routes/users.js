const express = require('express');
const router = express.Router();

const { signup, login, protect } = require('../controllers/authController');
const { getUser } = require('../controllers/userController');

router.route('/signup').post(signup);
router.route('/login').post(login);

// router.use(protect);
router.route('/:id').get(protect, getUser);

module.exports = router;
