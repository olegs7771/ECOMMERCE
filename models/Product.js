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
          return /^\d+(,\d{3})*(\.\d{1,2})?$/.test(value);
        },
        message: (props) => `${props.value} is not valid price!`,
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
    quantity: {
      type: String,
      required: [true, 'Please provide quntity'],
      validate: {
        validator: function (value) {
          return /^[0-9]*$/.test(value);
        },
        message: 'Quantity accept only numbers',
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
      enum: ['Apple', 'Samsung', 'Silver', 'Microsoft', 'Lenovo', 'ASUS'],
    },
    ratings: [
      {
        star: Number,
        user: { type: ObjectId, ref: 'User' },
      },
    ],
  },
  { timestamps: true }
);

//CREATE PRODUCT SLUG
productSchema.pre('save', function (next) {
  console.log('product save this', this);
  this.slug = slugify(this.title, { lowercase: true });
  next();
});

// CUSTOM ERROR HANDLING

productSchema.post('save', function (err, doc, next) {
  let errors = {};
  errors.title = err.errors.title ? err.errors.title.message : '';
  errors.description = err.errors.description
    ? err.errors.description.message
    : '';
  errors.price = err.errors.price ? err.errors.price.message : '';
  errors.quantity = err.errors.quantity ? err.errors.quantity.message : '';

  console.log('errors', errors);
  next(errors);
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
