// server/routes/users.js

require('dotenv').config();

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.post('/signup', async (req, res) => {
  console.log('Signup request body:', req.body);
  try {
    // Extract confirmPassword and collect the rest of the body data into userData
    const { confirmPassword, termsAccepted, ...userData } = req.body;

       // Before creating a new user, check if the email or username already exists
       const existingUserByEmail = await User.findOne({ email: userData.email });
       if (existingUserByEmail) {
         return res.status(400).send({ error: 'Email already in use.' });
       }

       const existingUserByUsername = await User.findOne({ username: userData.username });
       if (existingUserByUsername) {
         return res.status(400).send({ error: 'Username already taken.' });
       }

    // Since the email is not in use, proceed to create the user
    const user = new User(userData);
    await user.save();

    // Check if JWT_SECRET is defined
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined. Check your .env file.');
    }

    // Generate a token and respond
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).send({ token });
  } catch (error) {
    console.error('Signup error:', error);

    // Handle the duplicate key error
    if (error.code === 11000) {
      res.status(400).send({ error: 'Email or username is already registered.' });
    } else {
      res.status(400).send({ error: error.message || 'Signup failed due to invalid input' });
    }
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).send({ error: 'Login failed. User not found.' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).send({ error: 'Login failed. Incorrect password.' });
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
});

// endpoint for username and email 

module.exports = router;