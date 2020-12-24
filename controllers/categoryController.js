const asyncCatch = require('../utils/asyncCatch');
const User = require('../models/User');
const Category = require('../models/Category');
const AppErrorHandler = require('../utils/AppError');
const slugify = require('slugify');

// CREATE GATEGORY
const create = asyncCatch(async (req, res, next) => {
  const body = { name: req.body.name, slug: slugify(req.body.name) };
  const category = await Category.create(body);
  res.status(200).json({ status: 'success', data: category });
});
////////////////////////////////////////////////////////////

// FIND ALL CATEGORIES
const list = asyncCatch(async (req, res, next) => {
  console.log('list');
  const categories = await Category.find();
  res
    .status(200)
    .json({ status: 'success', qnt: categories.length, data: categories });
});
/////////////////////////////////////////////////////
const read = asyncCatch(async (req, res, next) => {});
const update = asyncCatch(async (req, res, next) => {});
const remove = asyncCatch(async (req, res, next) => {});

module.exports = { create, read, update, remove, list };
