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
      maxlength: [32, 'Name to long'],
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
  // console.log('doc', doc);
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error(`[${doc.name}] sub-category name already exists!`));
  } else {
    next(error);
  }
});

const Sub = mongoose.model('Sub', subSchema);
module.exports = Sub;
