const mongoose = require('mongoose');

// Schema and Model setup
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  raiting: {
    type: Number,
    required: [true, 'A tour must have a raiting'],
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a Price'],
  },
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
