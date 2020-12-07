const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'The user must have a name'],
  },
  email: {
    type: String,
    required: [true, 'The user must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Email invalid format'],
  },

  password: {
    type: String,
    required: [true, 'Please choose a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirmed: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'No match',
    },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
