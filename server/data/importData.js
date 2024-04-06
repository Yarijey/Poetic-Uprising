require('dotenv').config({ path: '../.env' }); // Adjust the path to where your .env file is located relative to the importData.js script


const mongoose = require('mongoose');
const Word = require('../models/word'); // Adjust the path as necessary
const data = require('./updatedWordPoemDatabase.json'); // Adjust the path as necessary

console.log("Mongo URI: ", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const importData = async () => {
  try {
    await Word.insertMany(data);
    console.log('Data import successful');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error importing data:', error);
    mongoose.disconnect();
  }
};

importData();
