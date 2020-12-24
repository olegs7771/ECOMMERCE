const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, 'Name too short'],
      maxlength: [32, 'Name to long'],
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true }
);

//Methods
categorySchema.pre('save', async function (next) {
  console.log('category model this ', this);
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
