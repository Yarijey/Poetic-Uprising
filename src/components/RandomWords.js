// src/components/RandomWords.js

import React, { useState, useEffect } from "react";
import "./RandomWords.css";
import DraggableWordBox from "./DraggableWordBox";
import PoemDropZone from "./PoemDropZone";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from "react-router-dom";

const RandomWords = ({ includeDetails }) => {
  const [words, setWords] = useState([]);
  const [poemWords, setPoemWords] = useState([]);
  const navigate = useNavigate(); // For redirection
  const [showShuffle, setShowShuffle] = useState(false); // State control visibility of shuffle button
  const [showSave, setShowSave] = useState(false); // State control visibility of save button
  const [droppedWords, setDroppedWords] = useState([]);


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
      setShowShuffle(true); // state to show the shuffle button
    } catch (error) {
      console.error("Error fetching random words:", error);
      setShowShuffle(false); // If there's an error, don't show the shuffle button
    }
  };

  // Function to shuffle words
  const shuffleWords = () => {
    console.log("Before shuffle:", words); // Log the array before shuffling
    const array = [...words.sort((a, b) => 0.5 - Math.random())];
   // let array = words.slice(); // Creates a shallow copy of the words array
    //for (let i = array.length - 1; i > 0; i--) {
        //const j = Math.floor(Math.random() * (i + 1));
       // [array[i], array[j]] = [array[j], array[i]]; // Swap elements
   // }
    console.log("After shuffle:", array); // Log the array after shuffling
    setWords(array); // Update the state with the shuffled words
};

  // Function to handle drop
  const handleDrop = (item) => {
    console.log("Dropped item:", item); // This will log the dropped item to the console

    setDroppedWords((prevDroppedWords) => {
      const newWord = item.word;
      if (newWord && !prevDroppedWords.includes(newWord)) {
        setShowSave(true); // Show save button if not already visible
        return [...prevDroppedWords, newWord];
      }
      return prevDroppedWords;
    });
  };

// Function to save poem
const savePoem = async () => {
  const poemContent = droppedWords.join(" "); // Creates a string from the droppedWords array
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage

  if (!token) {
    console.error("No token found");
    return; // Exit the function if no token is available
  }

  try {
    const response = await fetch("http://localhost:5001/poems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`  // Include the token in the Authorization header
      },
      body: JSON.stringify({
        content: poemContent,
        shared: true, // Update as per your requirement
        theme: "Your Theme", // Update with theme option for later
        mood: "Your Mood", // Update with mood option for later
      }),
    });

    if (response.ok) {
      console.log("Poem saved successfully");
      setDroppedWords([]); // Reset the dropped words after saving
      navigate("/user-profile"); // Redirect to user profile
    } else {
      const errorData = await response.json();
      console.error("Failed to save the poem:", errorData.message);
    }
  } catch (error) {
    console.error("Error saving the poem:", error);
  }
};

  console.log("Current poem words:", poemWords.join(', '));

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="random-words-container">
        <button className="random-words-button" onClick={fetchRandomWords}>
          Get Random Words
        </button>
       {false && (
          <button className="shuffle-words-button" onClick={shuffleWords}>
            Shuffle Words
          </button>
        )}
        <div className="words-container">
          {words.map((item, index) => (
            <DraggableWordBox
              key={index}
              item={item}
              includeDetails={includeDetails}
            />
          ))}
        </div>
        <PoemDropZone onDrop={handleDrop}>
        {droppedWords.map((word, index) => (
            <div key={index} className="dropped-word">{word}</div>
          ))}
        </PoemDropZone>
        {showSave && (
        <button className="save-poem-button" onClick={savePoem}>
          Save Poem
        </button>
           )}
      </div>
    </DndProvider>
  );
};

export default RandomWords;
