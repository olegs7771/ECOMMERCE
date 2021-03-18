const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const ratingSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      default: 0,
    },
    user: {
      type: ObjectId,
      ref: 'User',
    },
    product: {
      type: ObjectId,
      ref: 'Product',
    },
  },
  {
    timestamps: true,
  }
);

// PREVENT FROM SAME USER LEAVING RATING FOR SAME PRODUCT
ratingSchema.index({ user: 1, product: 1 }, { unique: true });

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;
