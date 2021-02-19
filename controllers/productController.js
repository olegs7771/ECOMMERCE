const asyncCatch = require('../utils/asyncCatch');
const Sub = require('../models/Sub');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
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
  // console.log('req.query ', req.query);

  const products = await Product.find().sort({ updatedAt: -1 }).limit(4);
  if (!products) return next(new AppErrorHandler('No products found', 404));
  res
    .status(200)
    .json({ qnt: products.length, status: 'success', data: products });
});

// // SHOPPING CART 🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒

// CREATE GUEST CART by adding one product or by adding single products
const createCart = asyncCatch(async (req, res, next) => {
  console.log('req.body createCart', req.body);
  console.log('createCart params', req.params);
  console.log('req.user', req.user);

  let cart;
  let product;

  if (typeof req.user === 'object') {
    //User
    // // //1) Check if guest already has Cart
    cart = await Cart.findOne({ userId: req.user._id });
    // //2) FInd Product
    product = await Product.findById(req.body.productId);
  } else {
    //Guest
    // // //1) Check if guest already has Cart
    cart = await Cart.findOne({ guestId: req.user });
    // //2) FInd Product
    product = await Product.findById(req.body.productId);
  }

  console.log('product', product);
  console.log('cart', cart);
  // 3) Check if product still available

  if (product && product.instock !== 0) {
    if (cart) {
      console.log('cart exists');
      //  UPDATE CART add more products
      cart.addProduct(req.body.productId);

      await cart.save();
      const message = `${product.title} : was added to your shopping cart`;
      // SENT PRODUCT TO cookies
      res.cookie(`productId_${product._id}`, Math.round(Date.now() / 1000), {
        expires: new Date(
          Date.now() +
            parseInt(process.env.CART_COOKIE_EXP, 10) * 24 * 60 * 60 * 1000 //30d
        ),

        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
        sameSite: true,
      });

      res.status(200).json({ status: 'success', message, data: cart });
    } else {
      // CREATE NEW CART
      let cartObject;
      if (typeof req.user === 'object') {
        //For user
        cartObject = await Cart.create({
          userId: req.user._id,
          products: [
            {
              _id: req.body.productId,
              product: req.body.productId,
              quantity: 1,
            },
          ],
        });
      } else {
        cartObject = await Cart.create({
          guestId: req.user,
          products: [
            {
              _id: req.body.productId,
              product: req.body.productId,
              quantity: 1,
            },
          ],
        });
      }

      //SAVE PRODUCT IN cookie
      res.cookie(`productId_${product._id}`, Math.round(Date.now() / 1000), {
        expires: new Date(
          Date.now() +
            parseInt(process.env.CART_COOKIE_EXP, 10) * 24 * 60 * 60 * 1000 //30d
        ),

        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
        sameSite: true,
      });

      const message = `${product.title} was added to your shopping cart`;
      res.status(200).json({ status: 'success', message, data: cartObject });
    }
  } else {
    next(new AppErrorHandler('Product not available', 401));
  }
});

// UPDATE EXISTING PRODUCT INCART
const updateProduct = asyncCatch(async (req, res, next) => {
  console.log('req.user', req.user);
  console.log('req.body', req.body);
  console.log('req.params', req.params);
  //   // 1)Find cart
  let cart;
  if (typeof req.user === 'object') {
    //User
    cart = await Cart.findOne({ userId: req.user.id });
  } else {
    //Guest
    cart = await Cart.findOne({ guestId: req.user });
  }
  console.log('cart to update', cart);
  cart.updateProduct(req.body.productId, req.body.amountUpdate);
  await cart.save();
  res.status(200).json({
    status: 'success',
    message: 'Shopping cart was updated',
    data: cart,
  });
});

// // DELETE CART IF userId EXPIRED IN cookie
const deleteCart = asyncCatch(async (req, res, next) => {
  console.log('delete cart');
  // 1)Find Cart by userId
  const cart = await Cart.findOneAndDelete({ guestId: req.user });
  console.log('cart', cart);
});

// // FETCH PRODUCTS FROM SHOPPINGCART for guest or user
const getProductsCart = asyncCatch(async (req, res, next) => {
  // console.log('typeof req.user', typeof req.user);
  // console.log(' req.user', req.user);
  if (typeof req.user === 'object') {
    //For AUth User
    const cart = await Cart.findOne({ userId: req.user._id });
    console.log('user cart', cart);
    if (!cart)
      // return next(new AppErrorHandler(`Shoppingcart not found for ${req.user}`));
      return res.status(200).json({
        status: 'success',
        message: 'no cart created',
        data: {
          products: [],
        },
      });
    console.log('cart user', cart);
    return res.status(200).json({ status: 'success', data: cart });
  } else {
    // console.log('guest cart req.user', req.user);
    //For Guest
    //1) Find Shopping Cart by req.user coming from protectGuest
    const cart = await Cart.findOne({ guestId: req.user });
    if (!cart)
      // return next(new AppErrorHandler(`Shoppingcart not found for ${req.user}`));
      return res.status(200).json({
        status: 'success',
        message: 'no cart created',
        data: {
          products: [],
        },
      });
    console.log('cart guest', cart);
    return res.status(200).json({ status: 'success', data: cart });
  }
});

// REMOVE PRODUCT FROM CART by user/guest
const removeProduct = asyncCatch(async (req, res, next) => {
  console.log('req.user remove', req.user);
  //1)Find product
  // const product = await Product.findById(req.body.productId);
  // //2) Find cart
  // const cart = await Cart.findOne({ guestId: req.user });
  // if (!cart)
  //   return next(new AppErrorHandler(`Shoppingcart not found for ${req.user}`));
  // console.log('cart to remove', cart);
  // cart.removeProduct(req.body.productId);
  // console.log(cart.removeProduct(req.body.productId));

  // await cart.save();
  // res.status(200).json({
  //   status: 'success',
  //   message: `${product.title}:  was removed from shopping cart`,
  // });
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
  createCart,
  updateProduct,
  getProductsCart,
  deleteCart,
  removeProduct,
};
