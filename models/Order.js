const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const orderSchema = new mongoose.Schema({
  person: {
    type: String,
  },
  cart: {},
});
