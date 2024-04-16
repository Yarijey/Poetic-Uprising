require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

  const corsOptions = {
    origin: 'http://localhost:3000', // This should match the URL of your frontend
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

// Routers
const userRoutes = require('./routes/users');
const poemRoutes = require('./routes/poems');
const wordRoutes = require('./routes/words');

// Middleware
app.use(cors(corsOptions)); // Enable CORS with the options
app.use(express.json()); // Parse JSON payloads
app.use(morgan('combined')); // Use 'combined' format for HTTP logging

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.use('/users', userRoutes);
app.use('/poems', poemRoutes);
app.use('/words', wordRoutes);

const PORT = process.env.PORT || 5001;

// Start the server
console.log(`Starting server on port ${PORT}`);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

