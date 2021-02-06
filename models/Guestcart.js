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
    cart: [
      {
        productId: {
          type: String,
          required: [true, 'Provide product id'],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Guestcart = mongoose.model('Guestcart', guestcartSchema);
module.exports = Guestcart;
