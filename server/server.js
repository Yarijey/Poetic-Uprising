require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // Adjust this if your frontend is hosted elsewhere
};

app.use(cors(corsOptions)); // Enable CORS with the options

const userRoutes = require('./routes/users');
const poemRoutes = require('./routes/poems');
const wordRoutes = require('./routes/words');

// Middleware
app.use(cors());
app.use(express.json());

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

