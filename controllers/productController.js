const asyncCatch = require('../utils/asyncCatch');
const Sub = require('../models/Sub');
const Category = require('../models/Category');
const Product = require('../models/Product');
const AppErrorHandler = require('../utils/AppError');
const slugify = require('slugify');

//Create Product
