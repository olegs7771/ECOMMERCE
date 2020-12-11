const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const globalErrorHandler = require('./controllers/errorController');
const AppErrorClass = require('./utils/AppError');
require('dotenv').config();
const users = require('./routes/users');

//Body parser with limitted body
app.use(express.json({ limit: '10k' }));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

//Test middleware

app.use('/api/v1/users', users);

//Errors for missing routes

app.all('*', (req, res, next) => {
  next(new AppErrorClass(`Page  ${req.originalUrl} not found `, 404));
});

//Error handling for app
app.use(globalErrorHandler);

module.exports = app;
