const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    require: [true, 'The user must have a name'],
    minLength: [3, 'Min length 3 chars'],
  },
  email: {
    type: String,
    required: [true, 'The user must have an email'],
    unique: true,
    lowercase: true,
    // validate: [validator.isEmail, 'Email invalid format'],
    validate: {
      validator: function (value) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      },
    },
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
    minlength: [8, 'Min length 8 chars '],
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
  confirmationToken: String,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpired: Date,

  active: {
    type: Boolean,
    default: true,
    select: true,
  },
  activatedByEmail: {
    type: Boolean,
    default: false,
  },
  createdByOauth2: {
    type: Boolean,
    deafult: false,
  },
});

//Methods

// CONFIRMATION OF REGISTRATION
//CREATE TOKEN FOR SENDING TO NEWLY REGISTERED USER EMAIL
userSchema.methods.createConfirmationToken = function () {
  const token = crypto.randomBytes(32).toString('hex');
  console.log('token randomBytes ', token);
  this.confirmationToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  return {
    token: this.confirmationToken,
    id: this._id,
  };
};

// COMPARING TOKEN WITH INCOMIN CANDIDATE
userSchema.methods.compareToken = function (candidate) {
  console.log('in model', this.confirmationToken, candidate);
  return this.confirmationToken === candidate;
};

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

// MODIFY ERRORS

userSchema.post('save', function (err, doc, next) {
  console.log('doc', doc);
  let errors = {};
  console.log('err.errors', err);

  errors.user = err.errors.user ? err.errors.user.message : '';
  errors.email = err.errors.email ? err.errors.email.message : '';
  errors.password = err.errors.password ? err.errors.password.message : '';
  errors.confirm = err.errors.passwordConfirm
    ? err.errors.passwordConfirm.message
    : '';
  console.log('errors', errors);
  next(errors);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
