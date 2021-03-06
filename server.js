const app = require('./app');

require('dotenv').config();
const mongoose = require('mongoose');
const { promisify } = require('util');
const PORT = process.env.PORT || 5000;

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log(`connected to ${DB}`))
  .catch((err) => console.log('error to connect to DB', err));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const evenNumber = () => {
  let numbers = [];
  for (let index = 1; index < 100; index++) {
    if (index % 2 === 0) {
      numbers.push(index);
    }
  }
  return numbers;
};

console.log('evenNumber', evenNumber());
