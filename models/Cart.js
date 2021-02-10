const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const cartSchema = new mongoose.Schema(
  {
    guestId: {
      type: String,
      required: [true, 'Provide guest userId'],
    },
    userId: {
      type: ObjectId,
      ref: 'User',
    },
    products: [
      {
        type: ObjectId,
        ref: 'Product',
        required: [true, 'Provide product id'],
      },
    ],
  },
  {
    timestamps: true,
  }
);

// ADD PRODUCT TO EXISTED CART
cartSchema.methods.addProduct = function (productId) {
  // console.log('this', this);
  this.products.push(productId);
  return this;
};
//REMOVE PRODUCT FROM CART
cartSchema.methods.removeProduct = function (productId) {
  const index = this.products.indexOf(productId);
  console.log(index);
  if (index > -1) {
    this.products.splice(index, 1);
  }
};

cartSchema.pre(/^find/, function (next) {
  this.populate('products').select('-__v');
  next();
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
