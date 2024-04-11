// src/components/RandomWords.js

import React, { useState, useEffect } from "react";
import "./RandomWords.css";
import DraggableWordBox from "./DraggableWordBox";
import PoemDropZone from "./PoemDropZone";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from "react-router-dom"

const RandomWords = ({ includeDetails }) => {
  const [words, setWords] = useState([]);
  const [poemWords, setPoemWords] = useState([]);
  const navigate = useNavigate(); // For redirection

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

    // Function to shuffle words
    const shuffleWords = () => {
      let array = [...words];
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      setWords(array);
    };

// Function to handle drop
      const handleDrop = (item) => {
        setPoemWords((prevPoemWords) => [...prevPoemWords, item.word]);
    };

    // Function to save poem
const savePoem = async () => {
  const userId = 'user_id';  // Replace with the actual user ID logic
  const poemContent = poemWords.join(' ');  // Combine words to form the content

  try {
    const response = await fetch('http://localhost:5001/poems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        content: poemContent,
        shared: true,  // Update as per your requirement
        theme: 'Your Theme',  // Update with theme option for later 
        mood: 'Your Mood',  // Update with mood option for later 
      }),
    });

    if (response.ok) {
      console.log('Poem saved successfully');
      setPoemWords([]); // Reset the poem words after saving
      navigate('/user-profile');  // Redirect to user profile
    } else {
      console.error('Failed to save the poem');
    }
  } catch (error) {
    console.error('Error saving the poem:', error);
  }
};

    return (
      <DndProvider backend={HTML5Backend}>
        <div className="random-words-container">
          <button className="random-words-button" onClick={fetchRandomWords}>
            Get Random Words
          </button>
          <div className="words-container">
            {words.map((item, index) => (
              <DraggableWordBox key={index} item={item} includeDetails={includeDetails} />
            ))}
          </div>
          <button onClick={shuffleWords}>Reorder Words</button>
          <PoemDropZone onDrop={handleDrop} />
          <button onClick={savePoem}>Save Poem</button>
        </div>
      </DndProvider>
    );
  };

export default RandomWords;
