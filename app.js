const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const errorControl = require('./controllers/errorController');

const users = require('./routes/users');

//Body parser with limitted body
app.use(express.json({ limit: '10k' }));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/v1/users', users);

//Errors for missing routes

app.all('*', (req, res, next) => {
  // res.status(404).json({ error: `Page  ${req.originalUrl} not found ` });

  const err = new Error(`Page  ${req.originalUrl} not found `);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});

//Error handling for app
app.use(errorControl);

module.exports = app;
