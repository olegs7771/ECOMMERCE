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
    default: 'default-avatar.png',
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
    select: true,
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
    select: true,
  },
});

//Methods
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); //exit here if password not modified

  //Incrypt password
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined; // delete from model

  next();
});

// Instance Method Compare Passwords
userSchema.methods.correctPassword = async function (
  incomingPassword,
  existingPassword
) {
  return await bcrypt.compare(incomingPassword, existingPassword);
};

//  Instance Method For protect route middleware
//  Test if recently assigned Token owner change password after
//  token was issued

userSchema.methods.changedPassword = function (tokenTimeStampItp) {
  // console.log('this', this);
  if (this.passwordChangedAt) {
    // console.log('pass changed');
    const passwordChangedAt = this.passwordChangedAt.getTime() / 1000;
    //Password was changed

    return passwordChangedAt > tokenTimeStampItp;
  }
  //by default user not changed his password
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
