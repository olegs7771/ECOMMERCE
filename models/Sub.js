const mongoose = require('mongoose');
const slugify = require('slugify');
const { ObjectId } = mongoose.Schema;
// const Category = require('./Category');

const subSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: [3, 'Name too short'],
      maxlength: [42, 'Name to long'],
    },
    categoryId: {
      type: ObjectId,
      ref: 'Category',
      required: [true, 'Sub Category must have an Category id'],
    },

    slug: {
      type: String,
      lowercase: true,
      index: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// CHECK FOR SUB-CATEGORY CATEGORY NAME
subSchema.post('save', function (error, doc, next) {
  // console.log('err.message', error.message);
  // if (error.name === 'MongoError' && error.code === 11000) {
  //   next(new Error(`[${doc.name}] sub-category name already exists!`));
  // } else if (
  //   error.name === 'ValidationError' &&
  //   error.message.includes('short')
  // ) {
  //   next(new Error('Name too short. Please use meaningfull name'));
  // } else if (
  //   error.name === 'ValidationError' &&
  //   error.message.includes('long')
  // ) {
  //   next(new Error('Name too long. Please use meaningfull name'));
  // } else {
  //   next(error);
  // }
  let errors = {};
  if (error.name === 'MongoError' && error.code === 11000) {
    errors.name = `[${doc.name}] category name already exists!`;
    next(errors);
  }
  // errors.image = error.errors.image ? error.errors.image.message : '';
  errors.name = error.errors.name ? error.errors.name.message : '';

  console.log('errors', errors);
  next(errors);
});

subSchema.post('find', function (err, doc, next) {
  console.log('error in sub model find', err.name);
  let errors = {};
  if (err.name === 'CastError') {
    errors.sub = 'Wrong search parameters';
  }
  next(errors);
});

const Sub = mongoose.model('Sub', subSchema);
module.exports = Sub;
