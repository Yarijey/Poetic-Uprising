//server/routes/poems.js

const express = require('express');
const Poem = require('../models/poem');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware to authenticate and extract user ID from the token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) return res.sendStatus(401); // No token was provided

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token was not valid
    req.user = user; // Add the user payload to the request
    console.log("Extracted user from token:", req.user); // Log to check extracted user
    next(); // Proceed to the next middleware or route handler
  });
};

// Endpoint to create a new poem
router.post('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { content, shared, theme, mood } = req.body;
    const newPoem = new Poem({ userId, content, shared, theme, mood });
    const savedPoem = await newPoem.save();
    res.status(201).json(savedPoem);
  } catch (error) {
    console.error("Failed to save poem:", error);
    res.status(500).json({ message: "Failed to save poem", error: error.message });
  }
});

// Endpoint to get all poems for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Extract user ID from the authenticated token
    const userPoems = await Poem.find({ userId }).sort({ createdAt: -1 }); // Fetch poems and sort by creation date
    res.json(userPoems);
  } catch (error) {
    console.error("Failed to fetch user's poems:", error);
    res.status(500).json({ message: "Failed to fetch poems", error: error.message });
  }
});


// Endpoint to toggle like status of a poem
router.post('/:id/like', authenticateToken, async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id);
    if (!poem) {
      return res.status(404).send({ message: 'Poem not found' });
    }
    poem.liked = !poem.liked; // Toggle the liked status
    await poem.save();
    res.status(200).json(poem);
  } catch (error) {
    console.error("Failed to like poem:", error);
    res.status(500).json({ message: "Failed to like poem", error: error.message });
  }
});

// Endpoint to toggle share status of a poem
router.post('/:id/share', authenticateToken, async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id);
    if (!poem) {
      return res.status(404).send({ message: 'Poem not found' });
    }
    poem.shared = !poem.shared; // Toggle the shared status
    await poem.save();
    res.status(200).json(poem);
  } catch (error) {
    console.error("Failed to share poem:", error);
    res.status(500).json({ message: "Failed to share poem", error: error.message });
  }
});


// Endpoint to delete a poem
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id);
    if (!poem) {
      return res.status(404).send({ message: 'Poem not found' });
    }
    if (poem.userId.toString() !== req.user.userId) {
      return res.status(403).send({ message: 'Not authorized to delete this poem' });
    }
    await poem.remove();
    res.status(200).send({ message: 'Poem deleted successfully' });
  } catch (error) {
    console.error("Failed to delete poem:", error);
    res.status(500).json({ message: "Failed to delete poem", error: error.message });
  }
});



module.exports = router;

