// server/routes/users.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password, firstName, lastName, birthday, username } = req.body;
      // Hash the password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ email, password: hashedPassword, firstName, lastName, birthday, username });
    await user.save();

    // Generate a token and respond
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).send({ token });
  } catch (error) {
    res.status(400).send(error);
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

module.exports = router;