const express = require('express');
const router = express.Router();

const { create, list } = require('../controllers/subController');

router.route('/:categoryId').get(list);
router.route('/').post(create).get(list);

module.exports = router;
