const Rating = require('../models/Rating');
const asyncCatch = require('../utils/asyncCatch');

// UPDATE RATING FOR PRODUCT

const update = asyncCatch(async (req, res, next) => {
  console.log('req.user', req.user);
  console.log('req.params', req.params);
  //1) Find Rating by userId
  //If user already rated this product update his rating
  const rating = await Rating.findOneAndUpdate(
    { user: req.user._id, product: req.params.slug },
    { rating: req.body.rating },
    { new: true }
  );
  console.log('rating', rating);
  // if(!rating){
  //   //User Not
  // }
});

module.exports = {
  update,
};
