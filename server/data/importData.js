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
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Clear the existing Words collection if needed
    await Word.deleteMany({});

    // Insert new Words into the collection
    for (let poem of data) {
      for (let word of poem.words) {
        await new Word({
          word: word,
          author: poem.author,
          title: poem.title,
        }).save();
      }
    }

    console.log('Data import successful');
  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

importData();
