const express = require('express');
const router = express.Router();

const { signup } = require('../controllers/authController');
const { getUser } = require('../controllers/userController');

router.route('/signup').post(signup);

router.route('/:id').get(getUser);

module.exports = router;
