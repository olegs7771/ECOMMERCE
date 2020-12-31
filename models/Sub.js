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
    },
  },
  { timestamps: true }
);

const Sub = mongoose.model('Sub', subSchema);
module.exports = Sub;
