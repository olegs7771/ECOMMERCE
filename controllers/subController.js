const asyncCatch = require('../utils/asyncCatch');
const Sub = require('../models/Sub');
const AppErrorHandler = require('../utils/AppError');
const slugify = require('slugify');

// CREATE SUB-GATEGORY BY ADMIN
const create = asyncCatch(async (req, res, next) => {
  console.log('req.body', req.body);
  const sub = await Sub.create(req.body);
  res.status(200).json({ status: 'success', data: category });
});
