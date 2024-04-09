// src/components/RandomWords.js

import React, { useState, useEffect } from "react";
import "./RandomWords.css";

const RandomWords = ({ includeDetails }) => {
  const [words, setWords] = useState([]);

  useEffect(() => {
   // fetchRandomWords(); trigger fetchRandomWords only on button click.
  }, []);

  const fetchRandomWords = async () => {
    const queryParam = includeDetails ? "?details=true" : "";
    try {
      const response = await fetch(
        `http://localhost:5001/words/random${queryParam}`
      );
      const data = await response.json();
      setWords(data);
    } catch (error) {
      console.error("Error fetching random words:", error);
    }
  };

  return (
    <div className="random-words-container">
      <button className="random-words-button" onClick={fetchRandomWords}>
         Random Words 
         </button>
      < div className="words-container">
        {words.map((item, index) => (
          <span className="word-box" key={index}>
            {includeDetails
              ? `${item.word} (from "${item.title}" by ${item.author}) `
              : `${item} `}
          </span>
        ))}
        </div>
    </div>
  );
};

export default RandomWords;
