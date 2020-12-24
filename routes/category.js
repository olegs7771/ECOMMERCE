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

//ALL ROUTES PASS AUTHORIZATION
router.use(protect);

//ALL ROUTES RESTRICTED ONLY FOR ADMIN
router.use(restrictTo('admin'));

router.route('/').post(create);
router.route('/:slug').get(read).put(update).delete(remove);

module.exports = router;
