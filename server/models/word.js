const mongoose = require('mongoose');

// Define the schema for the words
const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

// Create a model from the schema
const Word = mongoose.model('Word', wordSchema);

module.exports = Word;
