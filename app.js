const express = require('express');
const path = require('path');
const AppErrorClass = require('./utils/AppError');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const globalErrorHandler = require('./controllers/errorController');
require('dotenv').config();
const app = express();

app.enable('trust proxy'); //Heroku works through proxies
//in order in authController.js createSendToken function
// be able to use  secure: req.secure || req.headers['x-forwarded-proto'] === 'https',

const users = require('./routes/users');
const category = require('./routes/category');
const sub = require('./routes/sub');
const product = require('./routes/product');
const cart = require('./routes/cart');
const order = require('./routes/order');
const rating = require('./routes/rating');

//FOR UPLOADING FILES
app.use(fileUpload());
//USING PUG TEMPLATE ENGINE
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Body parser with limitted body
app.use(express.json({ limit: '50Mb' }));
//Body Parsing
app.use(express.urlencoded({ extended: true }));
//Cookie Parsing
app.use(cookieParser());

// TEST req.headers
app.all('/test', (req, res, next) => {
  console.log('test');

  next();
});

//Public Folder

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  // app.get('*', (req, res) => {
  //   res.setHeader('set-cookie', ['SameSite=Strict;SameSite=Strict']);
  //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  // });
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use('/api/v1/users', users);
app.use('/api/v1/category', category);
app.use('/api/v1/sub', sub);
app.use('/api/v1/product', product);
app.use('/api/v1/cart', cart);
app.use('/api/v1/order', order);
app.use('/api/v1/rating', rating);

//Errors for missing routes

app.all('*', (req, res, next) => {
  next(new AppErrorClass(`Page  ${req.originalUrl} not found `, 404));
});

//Error handling for app
app.use(globalErrorHandler);

console.log(process.env.NODE_ENV);

module.exports = app;
