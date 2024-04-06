const express = require('express');
const Poem = require('../models/poem');

const router = express.Router();

// Endpoint to create a new poem
router.post('/', async (req, res) => {
  try {
    const { userId, content, shared, theme, mood } = req.body;
    const newPoem = new Poem({ userId, content, shared, theme, mood });
    const savedPoem = await newPoem.save();
    res.status(201).json(savedPoem);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Add more endpoints as needed for retrieving, updating, and deleting poems

module.exports = router;

