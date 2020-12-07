const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res, next) => {
  res.json({ status: 'success' });
  console.log('req.body', req.body);
  next();
};
