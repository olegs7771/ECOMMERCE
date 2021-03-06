const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const cartSchema = new mongoose.Schema(
  {
    guestId: {
      type: String,
    },
    userId: {
      type: String,
    },
    products: [
      {
        product: {
          type: ObjectId,
          ref: 'Product',
          required: [true, 'Provide product id'],
        },
        quantity: {
          type: Number,
          default: 0,
        },
      },
    ],
    cartPaid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// ADD PRODUCT TO EXISTED CART
cartSchema.methods.addProduct = function (productId) {
  // console.log('productId', productId);
  // console.log('this addProduct', this);
  const arrProduct = this.products.filter(
    (el) => el._id.toString() === productId
  );
  // console.log('arrProduct', arrProduct);
  if (arrProduct.length === 0) {
    // console.log('product not exists');
    return this.products.push({
      quantity: 1,
      _id: productId,
      product: productId,
    });
  } else {
    // PRODUCT EXISTS
    arrProduct.forEach((product) => {
      // console.log('product', product);
      return (product.quantity = product.quantity + 1);
    });
  }
};
//REMOVE PRODUCT FROM CART
cartSchema.methods.removeProduct = function (productId) {
  console.log('this.removeProduct', this);
  console.log('productId', productId);
  const removedArr = this.products.filter(
    (elem) => elem._id.toString() !== productId
  );
  this.products = removedArr;
  return this;
};

//UPDATE PRODUCT
cartSchema.methods.updateProduct = function (productId, amountUpdate) {
  // console.log('this update', this);
  // console.log('productId', productId);
  // console.log('amountUpdate', amountUpdate);
  const productArr = this.products.filter(
    (el) => el._id.toString() === productId
  );
  console.log('productArr', productArr);
  productArr.forEach((product) => {
    console.log('product', product);

    return (product.quantity = amountUpdate);
  });
};

cartSchema.pre(/^find/, function (next) {
  this.populate('products.product').select('-__v');
  next();
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
