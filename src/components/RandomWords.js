// src/components/RandomWords.js

import React, { useState, useEffect } from 'react';

const RandomWords = () => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetchRandomWords();
  }, []);

  const fetchRandomWords = async () => {
    try {
      const response = await fetch('http://localhost:5001/words/random');
      const data = await response.json();
      setWords(data);
    } catch (error) {
      console.error('Error fetching random words:', error);
    }
  };

  return (
    <div>
      <h1>Random Words</h1>
      <ul>
        {words.map(word => (
          <li key={word._id}>
            {word.word} (from "{word.title}" by {word.author})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RandomWords;