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

// Add more endpoints as needed for retrieving, updating, and deleting poems

module.exports = router;

