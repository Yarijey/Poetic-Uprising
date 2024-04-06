const mongoose = require('mongoose');

// Define the schema for the words
const wordSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true // assuming the author is required, set to false if not
  },
  title: {
    type: String,
    required: true // assuming the title is required, set to false if not
  },
  content: {
    type: String,
    required: true // assuming the content is required, set to false if not
  },
  words: [{
    type: String
  }]
});

// Create a model from the schema
const Word = mongoose.model('Word', wordSchema);

module.exports = Word;
