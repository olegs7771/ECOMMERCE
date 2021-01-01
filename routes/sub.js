const express = require('express');
const router = express.Router();

const {
  create,
  list,
  update,
  remove,
  removeAll,
} = require('../controllers/subController');

router.route('/:categoryId').get(list); //find all sub-categories by categoryId
router.route('/').post(create).get(list); //create and fetch subs
router.route('/:slug').put(update).delete(remove);
router.route('/:categoryId/:slug').delete(removeAll); //delete all sub-categories

module.exports = router;
