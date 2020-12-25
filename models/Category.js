const mongoose = require('mongoose');
const slugify = require('slugify');
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, 'Name too short'],
      maxlength: [32, 'Name to long'],
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

//CREATE SLUG ON EVERY SAVE or CREATE but on insertMany()❗
categorySchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
