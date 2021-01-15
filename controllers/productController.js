const asyncCatch = require('../utils/asyncCatch');
const Sub = require('../models/Sub');
const Category = require('../models/Category');
const Product = require('../models/Product');
const AppErrorHandler = require('../utils/AppError');
const slugify = require('slugify');

//CREATE PRODUCT
const create = asyncCatch(async (req, res, next) => {
  console.log('req.body product create', req.body);
  const product = await Product.create(req.body);
  const message = `Product ${product.title} was added.`;
  res.status(200).json({ status: 'success', message, data: product });
});

// SHOW LIST PRODUCTS by SUB-CATEGORY ID
const list = asyncCatch(async (req, res, next) => {
  console.log('product list by subId');
  console.log('req.params list', req.params);
  const products = await Product.find({ sub: req.params.subId }).sort({
    createdAt: -1,
  });
  res
    .status(200)
    .json({ qnt: products.length, status: 'success', data: products });
});

// SHOW PRODUCTS by SUB-CATEGORY ID
const getAll = asyncCatch(async (req, res, next) => {
  console.log('product list by subId');
  console.log('req.params getAll', req.params);
  const products = await Product.find();

  res
    .status(200)
    .json({ qnt: products.length, status: 'success', data: products });
});

//SHOW ONE PRODUCT BY productId && slug

const getOne = asyncCatch(async (req, res, next) => {
  console.log('req.params getOne', req.params);
  const product = await Product.findOne({
    _id: req.params.productId,
    slug: req.params.slug,
  }).select('-__v');
  if (!product)
    return next(new AppErrorHandler(`Product ${req.params.slug} not found`));
  res.status(200).json({ status: 'success', data: product });
});

// DELETE PRODUCT
const removeOne = asyncCatch(async (req, res, next) => {
  console.log('req.params removeOne', req.params);
  const product = await Product.findOneAndDelete(
    { id: req.params.id, slug: req.params.slug },
    { select: 'title' }
  );
  if (!product)
    return next(new AppErrorHandler(`Product ${req.params.slug} not found.`));
  console.log('product', product);
  res
    .status(200)
    .json({ status: 'success', message: `Product ${product.title} removed` });
});

// REMOVE ALL PRODUCTS BY categoryId when deleting category
const removeAllByCategoryId = asyncCatch(async (req, res, next) => {
  console.log('req.params removeAllByCategoryId', req.params);
  const products = await Product.deleteMany({
    category: req.params.categoryId,
  });

  console.log('products in removeAllBycategoryId', products);
  res.status(200).json({
    status: 'success',
    message: 'All product for this category were deleted',
  });
});
// REMOVE ALL PRODUCTS BY subId When deleting sub-category
const removeAllBySubId = asyncCatch(async (req, res, next) => {
  const products = await Product.deleteMany({ sub: req.params.subId });
  console.log('products in removeAllBySubId', products);
  res.status(200).json({
    status: 'success',
    message: 'All product for this sub-category were deleted',
  });
});

// UPDATE PRODUCT
const update = asyncCatch(async (req, res, next) => {
  console.log('update product req.params', req.params);
  console.log('update product req.body', req.body);
  if (Object.keys(req.body).length === 0)
    return next(new AppErrorHandler('Can not update this product', 400));
  console.log('update');
  const update = {
    title: req.body.title,
    price: req.body.price,
    brand: req.body.brand,
    description: req.body.description,
    color: req.body.color,
    shipping: req.body.shipping,
    quantity: req.body.quantity,
  };
  const upProduct = await Product.findOneAndUpdate(
    { _id: req.params.productId, slug: req.params.slug },
    update,
    { new: true }
  );

  if (!upProduct)
    return next(
      new AppErrorHandler(`Can not find ${req.body.title} in our data base`)
    );
  // console.log('product', product);
  res.status(200).json({ status: 'success', data: upProduct });
});

module.exports = {
  create,
  list,
  getOne,
  getAll,
  update,
  removeOne,
  removeAllByCategoryId,
  removeAllBySubId,
};
