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

// CHECK FOR DUBLICATE CATEGORY NAME AND VALID LENGTH
categorySchema.post('save', function (error, doc, next) {
  console.log('error.name', error.name);
  console.log('error.message', error.message);

  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error(`[${doc.name}] category name already exists!`));
  } else if (error.name === 'ValidationError') {
    next(new Error('Name too short. Please use meaningfull name'));
  } else {
    next(error);
  }
});

categorySchema.post(/^find/, function (err, doc, next) {
  console.log('error in model find', err);
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
