const asyncCatch = require('../utils/asyncCatch');
const Sub = require('../models/Sub');
const Category = require('../models/Category');
const Product = require('../models/Product');
const AppErrorHandler = require('../utils/AppError');
const slugify = require('slugify');
const { cloudinary } = require('../utils/claudinary');

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
    slug: slugify(req.body.title),
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

// UPLOAD IMAGE TO CLOUDINARY

const uploadImage = asyncCatch(async (req, res, next) => {
  // console.log('req.body', req.body);
  // console.log('req.files', req.files);

  const uploadedResponse = await cloudinary.uploader.upload(req.body.file, {
    upload_preset: 'dev_setups',
    folder: `products/${req.body.slug}`,
  });
  console.log('uploadedResponse', uploadedResponse);
  const product = await Product.findById(req.body.productId);

  await product.addImage(uploadedResponse.public_id);
  await product.save({ validateBeforeSave: false });
  res
    .status(200)
    .json({ status: 'success', message: 'Image uploaded successfully' });
});

//  DELETE SELECTED IMAGES

const deleteImage = asyncCatch(async (req, res, next) => {
  console.log('req.body in delete', req.body);

  const deleteResponse = await cloudinary.api.delete_resources(
    req.body.publicIds,
    { all: true }
  );
  console.log('deleteResponse', deleteResponse);

  const product = await Product.findById(req.body.productId);
  console.log('product', product);
  product.deleteImages(req.body.publicIds);
  product.images = await product.deleteImages(req.body.publicIds);
  await product.save({ validateBeforeSave: false });

  res.status(200).json({ status: 'success', message: 'Deleted successfully' });
});

//  GET LAST ADDED PRODUCTS
// PUBLIC

const lastAdded = asyncCatch(async (req, res, next) => {
  console.log('req.query ', req.query);

  const products = await Product.find().sort({ updatedAt: -1 }).limit(4);
  if (!products) return next(new AppErrorHandler('No products found', 404));
  res
    .status(200)
    .json({ qnt: products.length, status: 'success', data: products });
});

// SHOPPING CART
const addProductToCart = asyncCatch(async (req, res, next) => {
  //1 Find product by product slug
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) return next(new AppErrorHandler('No Product Found', 401));
  console.log('product', product);
  //2) Add  product to cookie
  res.cookie(`product_ids|${product._id}`, Math.round(Date.now() / 1000), {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXP, 10) * 24 * 60 * 60 * 1000
    ),
    // httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    sameSite: true,
  });
  res.status(200).json({ status: 'success', data: product });
});
//Remove Product From Shopping Cart
const removeProductToCart = asyncCatch(async (req, res, next) => {
  //1 Find product by product slug
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) return next(new AppErrorHandler('No Product Found', 401));
  console.log('product', product);
  // 2) Clear cookie of product
  res.clearCookie(`product_ids|${product._id}`);
  res.status(200).json({ status: 'success', data: product });
});

// GET PRODUCTS FOR SHOPPING CART .Receives array from action.
const getProducts4Cart = asyncCatch(async (req, res, next) => {
  console.log('req.body getProducts4Cart', req.body.data);
  //1) Get Product for Shopping Cart
  const products = await Product.find().where('_id').in(req.body.data).exec();
  res.status(200).json({ status: 'success', data: products });
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
  uploadImage,
  deleteImage,
  lastAdded,
  addProductToCart,
  removeProductToCart,
  getProducts4Cart,
};
