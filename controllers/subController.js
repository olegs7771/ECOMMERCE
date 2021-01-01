const asyncCatch = require('../utils/asyncCatch');
const Sub = require('../models/Sub');
const Category = require('../models/Category');
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
  const sub = await Sub.findOne({ slug: req.params.slug });
  if (!sub)
    return next(new AppErrorHandler(`sub ${req.params.slug} not exists`, 404));
  //  UPDATE sub
  sub.name = req.body.name;
  sub.slug = slugify(req.body.name);
  await sub.save();
  const message = `Sub-category ${req.params.slug} updated.`;
  res.status(200).json({ status: 'success', data: sub, message });
});

////////////////////////////////////////////////////
// REMOVE ONE CATEGORY
const remove = asyncCatch(async (req, res, next) => {
  console.log('req.params', req.params); //req.params.slug
  const sub = await Sub.findOneAndDelete({ slug: req.params.slug });
  if (!sub)
    return next(new AppErrorHandler(`No sub ${req.params.slug} found `, 404));
  res.status(200).json({ status: 'success', data: sub });
});

// REMOVE ALL SUB-CATEGORIES OF CATEGORY
const removeAll = asyncCatch(async (req, res, next) => {
  console.log('req.params removeAll', req.params);

  // 1) Find all sub-catregory of current category
  await Sub.deleteMany({ categoryId: req.params.categoryId });
  res
    .status(200)
    .json({
      status: 'success',
      message: `Category ${req.params.slug} deleted `,
    });
});

module.exports = { create, list, update, remove, removeAll };
