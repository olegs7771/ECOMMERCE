const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, 'Name too short'],
    maxlength: [32, 'Name to long'],
  },

  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true,
  },
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
