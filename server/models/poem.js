// server/ models/ poem.js

const mongoose = require('mongoose');

// Define the schema for the poems
const poemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  
  liked: {
    type: Boolean,
    default: false
  },
  
  shared: {
    type: Boolean,
    default: false
  },
  theme: {
    type: String,
    required: false
  },
  mood: {
    type: String,
    required: false
  },
  wordCount: {
    type: Number,
    required: false,
    default: 0
  }
});

// Middleware to update the 'updatedAt' field on save
poemSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Middleware to update word count before saving
poemSchema.pre('save', function(next) {
  //a string of words separated by spaces
  this.wordCount = this.content.split(/\s+/).length;
  next();
});

// Create a model from the schema
const Poem = mongoose.model('Poem', poemSchema);

module.exports = Poem;
