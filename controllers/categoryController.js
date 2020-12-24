const asyncCatch = require('../utils/asyncCatch');
const User = require('../models/User');
const Category = require('../models/Category');
const AppErrorHandler = require('../utils/AppError');
const slugify = require('slugify');

const create = asyncCatch(async (req, res, next) => {
  // 1) CREATE GATEGORY
  const body = { name: req.body.name, slug: slugify(req.body.name) };
  const category = await Category.create(body);
  res.status(200).json({ status: 'success', data: category });
});

/////////////////////////////////////////////////////
const read = asyncCatch(async (req, res, next) => {});
const update = asyncCatch(async (req, res, next) => {});
const remove = asyncCatch(async (req, res, next) => {});
const list = asyncCatch(async (req, res, next) => {});

module.exports = { create, read, update, remove, list };
