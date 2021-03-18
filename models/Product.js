const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Please provide title'],
      maxLength: [32, 'Max length of title 32 chars'],
      minLength: [2, 'Min length 2 chars'],
      text: true,
    },
    slug: {
      type: String,
      unique: [true, 'Slug must be unique'],
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
      minLength: [20, 'Please provide min 20 chars'],
      maxLength: [2000, 'Max length 2000 chars'],
      text: true,
    },
    price: {
      type: String,
      required: [true, 'Please provide the price'],
      validate: {
        validator: function (value) {
          return /^(?!0,?\d)([0-9]{2}[0-9]{0,}(\.[0-9]{2}))$/.test(value);
        },
        message: (props) => `${props.value} is not valid price format!`,
      },
      trim: true,
      maxLength: 32,
    },
    category: {
      type: ObjectId,
      ref: 'Category',
    },
    sub: {
      type: ObjectId,
      ref: 'Sub',
    },
    instock: {
      type: Number,
      required: [true, 'Please provide quntity'],
      instock: {
        validator: function (value) {
          return /^[0-9]*$/.test(value);
        },
        message: 'instock accept only numbers',
      },
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ['Yes', 'No'],
    },
    color: {
      type: String,
      enum: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
    },
    brand: {
      type: String,
      enum: ['Apple', 'Samsung', 'IBM', 'Microsoft', 'Lenovo', 'ASUS'],
    },
    ratings: [
      {
        type: ObjectId,
        ref: 'Rating',
      },
    ],
  },
  { timestamps: true }
);

productSchema.pre('save', function (next) {
  console.log('this to price', this);
  next();
});

//  CREATE SLUG ON SAVE
productSchema.pre('save', function (next) {
  console.log('product creating this', this);
  this.slug = slugify(this.title, { lower: true });
  next();
});

// POPULATE IMAGES
productSchema.methods.addImage = async function (imagePath) {
  console.log('imagePath in model', imagePath);
  console.log('this in model', this);
  await this.images.push(imagePath);
  return this.images;
};

// DELETE IMAGES BY publicId

productSchema.methods.deleteImages = async function (data) {
  console.log('data', data);
  console.log('this', this);
  const newArray = await this.images.filter((elem) => !data.includes(elem));
  return newArray;
};

// CUSTOM ERROR HANDLING

productSchema.post('save', function (err, doc, next) {
  let errors = {};
  errors.title = err.errors.title ? err.errors.title.message : '';
  errors.description = err.errors.description
    ? err.errors.description.message
    : '';
  errors.price = err.errors.price ? err.errors.price.message : '';
  errors.instock = err.errors.instock ? err.errors.instock.message : '';

  console.log('errors', errors);
  next(errors);
});

productSchema.methods.addRating = async function (user) {
  console.log('modal rating.user', user);
  console.log('this addRating', this);
  this.ratings.push(user);
};

productSchema.pre(/find/, function (next) {
  this.populate('ratings').select('-__v');
  next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
