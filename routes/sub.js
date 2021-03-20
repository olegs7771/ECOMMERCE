const express = require('express');
const router = express.Router();

const {
  create,
  list,
  allSubs,
  update,
  remove,
  removeAll,
} = require('../controllers/subController');

const { protect, restrictTo } = require('../controllers/authController');

// PUBLIC
router.route('/').get(allSubs); //load all sub-categories
router.route('/:categoryId').get(list); //find all sub-categories by categoryId

// PROTECTED AND RESTRICTED TO ADMIN ONLY ❗
router.use(protect);
router.use(restrictTo('admin'));

router.route('/').post(create); //create and fetch subs
router.route('/:slug').put(update).delete(remove);
router.route('/:categoryId/:slug').delete(removeAll); //delete all sub-categories
module.exports = router;
