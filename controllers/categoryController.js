const asyncCatch = require('../utils/asyncCatch');
const User = require('../models/User');
const Category = require('../models/Category');
const AppErrorHandler = require('../utils/AppError');

// CREATE GATEGORY BY ADMIN
const create = asyncCatch(async (req, res, next) => {
  const category = await Category.create(req.body);
  res.status(200).json({ status: 'success', data: category });
});
////////////////////////////////////////////////////
// FIND ALL CATEGORIES PUBLIC
const list = asyncCatch(async (req, res, next) => {
  console.log('list');
  const categories = await Category.find().sort({ createAt: -1 });
  res
    .status(200)
    .json({ status: 'success', qnt: categories.length, data: categories });
});
/////////////////////////////////////////////////////
// FIND ONE CATEGORY PUBLIC
const read = asyncCatch(async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.slug }).select(
    '-__v'
  );
  res.status(200).json({ status: 'success', data: category });
});
const update = asyncCatch(async (req, res, next) => {});
////////////////////////////////////////////////////
// REMOVE ONE CATEGORY
const remove = asyncCatch(async (req, res, next) => {
  const category = await Category.findOneAndDelete({ slug: req.params.slug });
  res.status(200).json({ status: 'success', data: category });
});

module.exports = { create, read, update, remove, list };
