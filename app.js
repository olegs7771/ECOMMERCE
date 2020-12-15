const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const globalErrorHandler = require('./controllers/errorController');
const AppErrorClass = require('./utils/AppError');
require('dotenv').config();
const users = require('./routes/users');

app.use(fileUpload());

//Body parser with limitted body
app.use(express.json());
//Body Parsing
app.use(express.urlencoded({ extended: true }));
//Cookie Parsing
app.use(cookieParser());

app.all('/', (req, res, next) => {
  console.log('re.headers', req.headers);
});

//Public Folder

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.setHeader('set-cookie', ['SameSite=Strict;SameSite=Strict']);
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//Test middleware

app.use('/api/v1/users', users);

//Errors for missing routes

app.all('*', (req, res, next) => {
  next(new AppErrorClass(`Page  ${req.originalUrl} not found `, 404));
});

//Error handling for app
app.use(globalErrorHandler);

console.log(process.env.NODE_ENV);

module.exports = app;
