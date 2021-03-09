const AppErrorHandler = require('../utils/AppError');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncCatch = require('../utils/asyncCatch');

// // SHOPPING CART 🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒

// CREATE GUEST CART by adding one product or by adding single products
const createCart = asyncCatch(async (req, res, next) => {
  console.log('req.body createCart!', req.body);
  console.log('createCart params', req.params);
  console.log('req.user', req.user);

  let cart;
  let product;

  if (typeof req.user === 'object') {
    //User
    // // //1) Check if guest already has Cart
    cart = await Cart.findOne({ userId: req.user._id, cartPaid: false });

    // //2) FInd Product
    product = await Product.findById(req.body.productId);
  } else {
    //Guest
    // // //1) Check if guest already has Cart
    cart = await Cart.findOne({ guestId: req.user, cartPaid: false });
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
    cart = await Cart.findOne({ userId: req.user.id, cartPaid: false });
  } else {
    //Guest
    cart = await Cart.findOne({ guestId: req.user, cartPaid: false });
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
  if (typeof req.user === 'object') {
    //Delete for User
    console.log('delete cart');
    // 1)Find Cart by userId
    const cart = await Cart.findOneAndDelete({ userId: req.user.id });
    if (!cart) return next(new AppErrorHandler('No cart found for user', 400));
    console.log('cart user', cart);
  } else {
    //Delete for Guest
    console.log('delete cart');
    // 1)Find Cart by userId
    const cart = await Cart.findOneAndDelete({ guestId: req.user });
    if (!cart) return next(new AppErrorHandler('No cart found for guest', 400));

    console.log('cart guest', cart);
  }
  res
    .status(200)
    .json({ status: 'success', message: 'Shopping cart was deleted' });
});

// // FETCH PRODUCTS FROM SHOPPINGCART for guest or user
const getProductsCart = asyncCatch(async (req, res, next) => {
  // console.log('typeof req.user', typeof req.user);
  // console.log(' req.user', req.user);
  if (typeof req.user === 'object') {
    //For AUth User
    const cart = await Cart.findOne({ userId: req.user._id, cartPaid: false });
    // console.log('user cart', cart);
    if (!cart)
      // return next(new AppErrorHandler(`Shoppingcart not found for ${req.user}`));
      return res.status(200).json({
        status: 'success',
        message: 'no cart created',
        data: {
          products: [],
        },
      });
    // console.log('cart user', cart);
    return res.status(200).json({ status: 'success', data: cart });
  } else {
    // console.log('guest cart req.user', req.user);
    //For Guest
    //1) Find Shopping Cart by req.user coming from protectGuest
    const cart = await Cart.findOne({ guestId: req.user, cartPaid: false });
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
  const product = await Product.findById(req.body.productId);
  // //2) Find cart
  let cart;
  if (typeof req.user === 'object') {
    //User
    cart = await Cart.findOne({ userId: req.user.id });
  } else {
    //Guest
    cart = await Cart.findOne({ guestId: req.user });
  }

  if (!cart)
    return next(new AppErrorHandler(`Shoppingcart not found for ${req.user}`));
  console.log('cart to remove', cart);
  cart.removeProduct(req.body.productId);
  console.log(cart.removeProduct(req.body.productId));

  await cart.save();
  res.status(200).json({
    status: 'success',
    message: `${product.title}:  was removed from shopping cart`,
  });
});

// GET CART BY cartId
const getCartById = asyncCatch(async (req, res, next) => {
  console.log('req.user', req.user);
  console.log('get cart by caertId');
  const cart = await Cart.findById(req.params.cartId);
});
module.exports = {
  getCartById,
  createCart,
  getProductsCart,
  deleteCart,
  updateProduct,
  removeProduct,
};
