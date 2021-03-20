const Rating = require('../models/Rating');
const Product = require('../models/Product');
const asyncCatch = require('../utils/asyncCatch');

// UPDATE RATING FOR PRODUCT

const update = asyncCatch(async (req, res, next) => {
  console.log('req.user', req.user);
  console.log('req.params', req.params);

  //1) Find Rating by userId
  //If user already rated this product update his rating
  const rating = await Rating.findOneAndUpdate(
    { user: req.user._id, product: req.params.productId },
    { rating: req.body.rating },
    { new: true }
  );
  console.log('rating', rating);
  if (!rating) {
    //User Not Ranked Current Product Yet
    const rating = await Rating.create({
      user: req.user._id,
      product: req.params.productId,
      rating: req.body.rating,
    });
    //Rating was created add it to product ratings array
    console.log('rating was created', rating);
    const product = await Product.findById(req.params.productId);
    console.log('product', product);
    product.addRating(rating._id);
    const upProduct = await product.save();
    res.status(200).json({ message: 'success' });
  } else {
    console.log('rating was updated', rating);
    res.status(200).json({ message: 'success' });
  }
});

module.exports = {
  update,
};
