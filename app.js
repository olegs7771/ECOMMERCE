const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const users = require('./routes/users');

//Body parser with limitted body
app.use(express.json({ limit: '10k' }));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Entering app');
});
app.post('/api/v1/users/signup', (req, res, next) => {
  console.log('pipeline');
  next();
});

app.use('/api/v1/users', users);

module.exports = app;
