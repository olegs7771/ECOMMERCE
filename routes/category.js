const express = require('express');
const router = express.Router();

const { protect, restrictTo } = require('../controllers/authController');
const {
  create,
  read,
  update,
  remove,
  list,
} = require('../controllers/categoryController');

//PUBLIC
router.route('/').get(list); //get all categories
router.route('/:slug').get(read); //get one category

//ALL ROUTES PASS AUTHORIZATION MIDDLEWARE
router.use(protect);

//ALL ROUTES RESTRICTED ONLY FOR ADMIN MIDDLEWARE
router.use(restrictTo('admin'));

router.route('/').post(create);
router.route('/:slug').put(update).delete(remove);

module.exports = router;
