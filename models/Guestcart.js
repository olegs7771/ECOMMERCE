const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const guestcartSchema = new mongoose.Schema(
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
guestcartSchema.methods.addProduct = function (productId) {
  console.log('this', this);
  this.products.push(productId);
  return this;
};
//REMOVE PRODUCT FROM CART
guestcartSchema.methods.removeProduct = function (productId) {
  const index = this.products.indexOf(productId);
  console.log(index);
  if (index > -1) {
    this.products.splice(index, 1);
  }
};

const Guestcart = mongoose.model('Guestcart', guestcartSchema);
module.exports = Guestcart;
