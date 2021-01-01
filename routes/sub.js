const express = require('express');
const router = express.Router();

const {
  create,
  list,
  update,
  remove,
  removeAll,
} = require('../controllers/subController');

router.route('/:categoryId').get(list).delete(removeAll); //find all sub-categories by categoryId
router.route('/').post(create).get(list); //create and fetch subs
router.route('/:slug').put(update).delete(remove);

module.exports = router;
