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

// Endpoint to fetch a publicly shared poem by ID
router.get('/public-poems/:id', async (req, res) => {
  console.log("Hit the route for poem ID:", req.params.id);  // Log the requested poem ID
  try {
    const poem = await Poem.findOne({ _id: req.params.id, shared: true });
    if (!poem) {
      console.log("Poem not found or not shared"); // Log if the poem is not found or not shared
      return res.status(404).json({ message: 'Poem not found or not shared' });
    }
    console.log("Fetched poem:", poem);  // Log the fetched poem
    res.json(poem);
  } catch (error) {
    console.error("Error fetching poem:", error);
    res.status(500).json({ message: "Failed to fetch the poem", error: error.message });
  }
});

// Endpoint to create a new poem
router.post('/', authenticateToken, async (req, res) => {
  const { content, shared, theme, mood } = req.body;
  try {
    const newPoem = new Poem({
      userId: req.user.userId,
      content,
      shared,
      theme,
      mood
    });
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
    const userPoems = await Poem.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(userPoems);
  } catch (error) {
    console.error("Failed to fetch user's poems:", error);
    res.status(500).json({ message: "Failed to fetch poems", error: error.message });
  }
});

// Endpoint to like a poem
router.post('/:id/like', authenticateToken, async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id);
    if (!poem) {
      return res.status(404).send({ message: 'Poem not found' });
    }
    poem.liked = !poem.liked;
    await poem.save();
    res.status(200).json(poem);
  } catch (error) {
    console.error("Failed to like poem:", error);
    res.status(500).json({ message: "Failed to like poem", error: error.message });
  }
});

// Endpoint to toggle share status of a poem and provide a URL for the shared poem
router.post('/:id/share', authenticateToken, async (req, res) => {
  console.log("Hit the route for poem ID:", req.params.id); 
  try {
    const poem = await Poem.findById(req.params.id);
    if (!poem) {
      return res.status(404).send({ message: 'Poem not found' });
    }
    poem.shared = !poem.shared;
    await poem.save();

     // Log the protocol and host for debugging
     console.log('Updated poem:', poem); // Log the updated poem
     console.log('Protocol:', req.protocol);
     console.log('Host:', req.get('host'));

     const poemUrl = `${req.protocol}://${req.get('host')}/poems/public-poems/${poem._id}`
     console.log('Generated poem URL:', poemUrl); // Log the URL for debugging

   // Respond with the path to the shared poem page, not the full URL
   res.status(200).json({ poem: poem.toObject(), url: `/public-poems/${poem._id}` });
  } catch (error) {
    console.error("Failed to share poem:", error);
    res.status(500).json({ message: "Failed to share poem", error: error.message });
  }
});


// Endpoint to delete a poem
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const result = await Poem.deleteOne({ _id: req.params.id, userId: req.user.userId });
    if (result.deletedCount === 0) {
      return res.status(404).send({ message: 'Poem not found or not authorized to delete' });
    }
    res.status(200).send({ message: 'Poem deleted successfully' });
  } catch (error) {
    console.error("Failed to delete poem:", error);
    res.status(500).json({ message: "Failed to delete poem", error: error.message });
  }
});



module.exports = router;

