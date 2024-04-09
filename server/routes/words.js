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

//more endpoints as needed for retrieving, updating, and deleting word entries


// Endpoint to get random words, with optional detailed info
router.get('/random', async (req, res) => {
  const { details } = req.query;
  try {
    let aggregationPipeline = [{ $sample: { size: 60 } }];

    // If 'details' query parameter is provided and is 'true', include author and title
    if (details === 'true') {
      aggregationPipeline.push({ $project: { word: 1, author: 1, title: 1 } });
    } else {
      aggregationPipeline.push({ $project: { word: 1 } });
    }

    let randomWords = await Word.aggregate(aggregationPipeline);
    // If details are not requested, transform the output to an array of words only
    if (details !== 'true') {
      randomWords = randomWords.map(item => item.word);
    }
    res.status(200).json(randomWords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
