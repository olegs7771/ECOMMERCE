const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const validator = require('validator');
const orderSchema = new mongoose.Schema(
  {
    guestId: {
      type: String,
    },
    userId: {
      type: ObjectId,
      ref: 'User',
    },
    fname: {
      type: String,
      required: [true, 'Name  required'],
      minlength: [2, 'Min name length 2 chars'],
      maxlength: [20, 'Max name length 20 chars'],
    },
    lname: {
      type: String,
      required: [true, 'Last Name  required'],
      minlength: [2, 'Min name length 2 chars'],
      maxlength: [30, 'Max name length 30 chars'],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,

      validate: {
        validator: function (value) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
        },
        message: (props) => `${props.value} wrong format`,
      },
      required: [true, 'The user must have an email'],
    },
    province: {
      type: String,
      required: [true, 'Select province/territory'],
    },
    city: {
      type: String,
      required: [true, 'City  required'],
      minlength: [3, 'Min name length 3 chars'],
      maxlength: [20, 'Max name length 30 chars'],
    },
    country: {
      type: String,
      required: [true, 'City  required'],
    },
    suit: {
      type: String,
      required: [true, 'suit/apt required'],
    },
    street: {
      type: String,
      required: [true, 'street required'],
      minlength: [3, 'Min name length 3 chars'],
      maxlength: [20, 'Max name length 30 chars'],
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return validator.isMobilePhone(v, ['en-CA', 'en-US']);
        },
        message: (props) => `${props.value} is not valid phone number`,
      },
      required: [true, 'Phone number required'],
    },
    zipcode: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d$/.test(v);
        },
        message: (props) => `${props.value} is not valid zipcode format`,
      },
      required: [true, 'Zipcode  required'],
    },

    cartId: {
      type: ObjectId,
      ref: 'Cart',
    },

    payment: {
      type: Boolean,
      default: false,
    },
    total: {
      type: String,
      required: [true, 'Provide total price for order'],
    },
    paymentId: {
      type: String,
      Date,
    },
    paymentAt: {
      type: Date,
    },

    orderNumber: {
      type: Number,
    },
  },

  {
    timestamps: true,
  }
);

// orderSchema.pre('findOneAndUpdate', function () {
//   console.log('this pre save', this);
// });

// CUSTOM ERROR HANDLING FOR SAVE

orderSchema.post('save', function (err, doc, next) {
  // console.log('doc', doc);
  console.log('err in model', err);
  console.log('err in model name', err.name);
  console.log('err in model code', err.code);
  let errors = {};
  if (err.name === 'MongoError' || err.code === '11000') {
    errors.email = 'Such Email already exists!';
    return next(errors);
  }
  errors.fname = err.errors.fname ? err.errors.fname.message : '';
  errors.lname = err.errors.lname ? err.errors.lname.message : '';
  errors.email = err.errors.email ? err.errors.email.message : '';
  errors.province = err.errors.province ? err.errors.province.message : '';
  errors.city = err.errors.city ? err.errors.city.message : '';
  errors.suit = err.errors.suit ? err.errors.suit.message : '';
  errors.street = err.errors.street ? err.errors.street.message : '';
  errors.phone = err.errors.phone ? err.errors.phone.message : '';
  errors.zipcode = err.errors.zipcode ? err.errors.zipcode.message : '';

  console.log('errors', errors);
  next(errors);
});

// CUSTOM ERROR HANDLE FOR UPDATE
orderSchema.post('findOneAndUpdate', function (err, doc, next) {
  let errors = {};
  if (err.name === 'MongoError' || err.code === '11000') {
    errors.email = 'Such Email already exists!';
    return next(errors);
  }
  errors.fname = err.errors.fname ? err.errors.fname.message : '';
  errors.lname = err.errors.lname ? err.errors.lname.message : '';
  errors.email = err.errors.email ? err.errors.email.message : '';
  errors.province = err.errors.province ? err.errors.province.message : '';
  errors.city = err.errors.city ? err.errors.city.message : '';
  errors.suit = err.errors.suit ? err.errors.suit.message : '';
  errors.street = err.errors.street ? err.errors.street.message : '';
  errors.phone = err.errors.phone ? err.errors.phone.message : '';
  errors.zipcode = err.errors.zipcode ? err.errors.zipcode.message : '';

  console.log('errors in model update', errors);
  next(errors);
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
