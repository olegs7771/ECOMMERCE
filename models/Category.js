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
    image: {
      type: String,
      // required: [true, 'Please provide background image for category'],
    },
    description: {
      type: String,
      minlength: [20, 'Min description length 20 chars'],
      maxlength: [300, 'Max description length 300 chars'],
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
  let errors = {};
  if (error.name === 'MongoError' && error.code === 11000) {
    errors.name = `[${doc.name}] category name already exists!`;
    next(errors);
  }
  // errors.image = error.errors.image ? error.errors.image.message : '';
  errors.name = error.errors.name ? error.errors.name.message : '';
  errors.description = error.errors.description
    ? error.errors.description.message
    : '';

  console.log('errors', errors);
  next(errors);
});

categorySchema.post(/^find/, function (err, doc, next) {
  console.log('error in model find', err);
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
