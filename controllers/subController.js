const asyncCatch = require('../utils/asyncCatch');
const Sub = require('../models/Sub');
const AppErrorHandler = require('../utils/AppError');
const slugify = require('slugify');

// CREATE SUB-GATEGORY BY ADMIN
const create = asyncCatch(async (req, res, next) => {
  console.log('req.body', req.body);

  const sub = await Sub.create(req.body);
  res.status(200).json({ status: 'success', data: sub });
});

////////////////////////////////////////////////////
// FIND ALL CATEGORIES PUBLIC
const list = asyncCatch(async (req, res, next) => {
  console.log('req.params', req.params);
  console.log('sub list');
  const subs = await Sub.find({
    categoryId: req.params.categoryId,
  }).sort({
    createAt: -1,
  });
  res.status(200).json({ status: 'success', qnt: subs.length, data: subs });
});
////////////////////////////////////////////////////////
// UPDATE SUB NAME
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

module.exports = { create, list, update };
