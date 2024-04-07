// Log the current directory to confirm the script's execution location
console.log(`Current directory: ${process.cwd()}`);

// Load environment variables from the .env file in the current directory
require('dotenv').config({ path: './.env' }); // Adjust if your .env file is located elsewhere

// Log the loaded MongoDB URI to verify it's being read correctly
console.log("Loaded MongoDB URI: ", process.env.MONGO_URI);

const mongoose = require('mongoose');
const Word = require('../models/word'); // Adjust the path as necessary
const data = require('./updatedWordPoemDatabase.json'); // Adjust the path as necessary

const importData = async () => {
  try {
    // Connecting to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Inserting the data
    await Word.insertMany(data);
    console.log('Data import successful');
  } catch (error) {
    // Logging any errors that occur during the import or connection process
    console.error('Error importing data:', error);
  } finally {
    // Disconnecting from MongoDB once the import is complete or if an error occurs
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Executing the importData function
importData();
