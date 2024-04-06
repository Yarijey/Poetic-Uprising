const express = require('express');
const Word = require('../models/word');

const router = express.Router();

// Endpoint to create a new word entry
router.post('/', async (req, res) => {
  try {
    const { author, title, content, words } = req.body;
    const newWord = new Word({ author, title, content, words });
    const savedWord = await newWord.save();
    res.status(201).json(savedWord);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Add more endpoints as needed for retrieving, updating, and deleting word entries

// Endpoint to get a random word/words
router.get('/random', async (req, res) => {
  try {
    // Fetch a single random word or modify to fetch a set of words
    let randomWord = await Word.aggregate([{ $sample: { size: 20 } }]);
    res.status(200).json(randomWord);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
