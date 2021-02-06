const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'Provide guest userId'],
  },
});
