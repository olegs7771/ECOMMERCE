const asyncCatch = require('../utils/asyncCatch');
const User = require('../models/User');
const Category = require('../models/Category');
const AppErrorHandler = require('../utils/AppError');
const slugify = require('slugify');

// CREATE GATEGORY BY ADMIN
const create = asyncCatch(async (req, res, next) => {
  console.log('req.body', req.body);
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

////////////////////////////////////////////////////////
// UPDATE CATEGORY NAME
const update = asyncCatch(async (req, res, next) => {
  console.log('req.params', req.params);
  console.log('req.body', req.body);
  //1) CHECK IF BODY HAS NAME
  if (!req.body.name)
    return next(new AppErrorHandler(`Please provide a category name`, 400));

  // 2) CHECK IF CATEGORY EXISTS
  const category = await Category.findOne({ slug: req.params.slug });
  if (!category)
    return next(
      new AppErrorHandler(`Category ${req.params.slug} not exists`, 404)
    );
  //  UPDATE CATEGORY
  category.name = req.body.name;
  category.slug = slugify(req.body.name);
  await category.save();
  const message = `Category ${req.params.slug} updated.`;
  res.status(200).json({ status: 'success', data: category, message });
});
////////////////////////////////////////////////////
// REMOVE ONE CATEGORY
const remove = asyncCatch(async (req, res, next) => {
  console.log('req.params', req.params);
  const category = await Category.findOneAndDelete({ slug: req.params.slug });
  if (!category)
    return next(
      new AppErrorHandler(`No category ${req.params.slug} found `, 404)
    );
  res.status(200).json({ status: 'success', data: category });
});

module.exports = { create, read, update, remove, list };
