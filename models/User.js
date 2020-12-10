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
  avatar: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },

  password: {
    type: String,
    required: [true, 'Please choose a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      //This only works on create and save!!!
      validator: function (val) {
        return val === this.password;
      },
      message: 'No match',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpired: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

//Methods
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  //Incrypt password
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
