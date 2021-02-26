const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const orderSchema = new mongoose.Schema({
  buyer: {
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
    },
    city: {
      type: String,
      required: [true, 'City  required'],
      minlength: [3, 'Min name length 3 chars'],
      maxlength: [20, 'Max name length 30 chars'],
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
    phone: {},
  },
  cart: {
    type: ObjectId,
    ref: 'Cart',
  },
});
