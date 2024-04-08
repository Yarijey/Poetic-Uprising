const fs = require('fs');

// Function to extract all words from a string
function extractWords(text) {
  // This regex matches words and will include duplicates
  return text.toLowerCase().match(/\b\w+\b/g);
}

// Read the JSON file
let rawData = fs.readFileSync('/Users/yarijeytecher/Documents/Concordia-bootcamps/Poetic-Uprising/server/data/wordpoemdatabase.json');
let poems = JSON.parse(rawData);

// Update each poem with the words array
poems.forEach(poem => {
  poem.words = extractWords(poem.content);
});

// Write the updated data to a new file
fs.writeFileSync('updatedWordPoemDatabase.json', JSON.stringify(poems, null, 2));

