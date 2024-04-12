import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import likedIcon from "../assets/liked.png";
import notlikedIcon from "../assets/notliked.png"; 
import sharedIcon from "../assets/shared.png";
import notsharedIcon from "../assets/notshared.png";
import deleteIcon from "../assets/delete.png";

const UserProfile = () => {
  const [poems, setPoems] = useState([]); // hold the poems fetched from the backend
  const [loading, setLoading] = useState(true); //  be true when the request is ongoing
  const token = localStorage.getItem("token"); // token from local storage

  // Function like poem 
  const handleLike = async (poemId) => {
    try {
      const response = await fetch(`http://localhost:5001/poems/${poemId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to toggle like status');
      }
  
      const updatedPoem = await response.json();
  
      // Update the local state to reflect the change
      setPoems(poems.map(poem => poem._id === poemId ? updatedPoem : poem));
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  // Function share poem 
  const handleShare = async (poemId) => {
    try {
      const response = await fetch(`http://localhost:5001/poems/${poemId}/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to toggle share status');
      }
  
      const updatedPoem = await response.json();
  
      // Update the local state to reflect the change
      setPoems(poems.map(poem => poem._id === poemId ? updatedPoem : poem));
    } catch (error) {
      console.error('Error toggling share:', error);
    }
  };

  const handleDelete = async (poemId) => {
    try {
      const response = await fetch(`http://localhost:5001/poems/${poemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete poem');
      }
  
      // Remove the deleted poem from the local state
      setPoems(poems.filter(poem => poem._id !== poemId));
    } catch (error) {
      console.error('Error deleting poem:', error);
    }
  };

  useEffect(() => {
    // This effect will run once after the component mounts
    const fetchPoems = async () => {
      try {
        const response = await fetch("http://localhost:5001/poems", {
          headers: new Headers({
            Authorization: `Bearer ${token}`,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch poems");
        }
        const poemsData = await response.json();
        setPoems(poemsData); // Save the poems in the state
      } catch (error) {
        console.error("Error fetching poems:", error);
      } finally {
        setLoading(false); // We're not loading anymore
      }
    };

    if (token) {
      fetchPoems();
    }
  }, [token]); // Only re-run the effect if the token changes

  // Define your handlers for like, share, and delete here

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching poems
  }

  return (
    <div className="user-profile">
      <div className="navigation">{/* ... your navigation here ... */}</div>
      <div className="user-info">{/* ... your user info here ... */}</div>
      <div className="poems-section">
        <h3>My poems</h3>
        {poems.map((poem) => (
          <div key={poem._id} className="poem">
            <p>{poem.content}</p>
            <div className="actions">
              <img
                src={poem.liked ? likedIcon : notlikedIcon}
                alt="like"
                onClick={() => handleLike(poem._id)}
              />
              <img
                src={poem.shared ? sharedIcon : notsharedIcon}
                alt="share"
                onClick={() => handleShare(poem._id)}
              />
              <img
                src={deleteIcon}
                alt="delete"
                onClick={() => handleDelete(poem._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
