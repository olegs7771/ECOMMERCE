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
guestcartSchema.methods.addProduct = function (product) {
  console.log('this', this);
  this.products.push(product);
  return this;
};

const Guestcart = mongoose.model('Guestcart', guestcartSchema);
module.exports = Guestcart;
