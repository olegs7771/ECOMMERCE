const asyncCatch = require('../utils/asyncCatch');
const Sub = require('../models/Sub');
const Category = require('../models/Category');
const Product = require('../models/Product');
const AppErrorHandler = require('../utils/AppError');
const slugify = require('slugify');

//CREATE PRODUCT
const create = asyncCatch(async (req, res, next) => {
  console.log('req.body product cretae', req.body);
  const product = await Product.create(req.body);
  const message = `Product ${product.title} was added.`;
  res.status(200).json({ status: 'success', message, data: product });
});

// SHOW PRODUCTS by SUB-CATEGORY ID
const list = asyncCatch(async (req, res, next) => {
  const products = await Product.find({ sub: req.params.subId });
  res
    .status(200)
    .json({ qnt: products.length, status: 'success', data: products });
});

//SHOW ONE PRODUCT BY SlUG

const getOne = asyncCatch(async (req, res, next) => {
  console.log('req.params getOne', req.params);
  const product = await Product.findOne({ slug: req.params.slug });
  res.status(200).json({ status: 'success', data: product });
});

module.exports = { create, list, getOne };
