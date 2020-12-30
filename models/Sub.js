const mongoose = require('mongoose');
const slugify = require('slugify');
const { ObjectId } = require.Schema;
const subSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, 'Name too short'],
      maxlength: [32, 'Name to long'],
    },
    parent: {
      type: ObjectId,
      ref: 'Category',
      required: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true }
);

const Sub = mongoose.model('Sub', subSchema);
module.exports = Sub;
