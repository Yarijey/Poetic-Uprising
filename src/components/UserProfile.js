//src/components/UserProfile.js


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate(); // Hook for navigation

  // Function like poem
  const handleLike = async (poemId) => {
    try {
      const response = await fetch(`http://localhost:5001/poems/${poemId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to toggle like status");
      }

      const updatedPoem = await response.json();
      setPoems(poems.map((poem) => (poem._id === poemId ? updatedPoem : poem)));
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };


    // Function to share a poem and navigate to the public page
    const handleShare = async (poemId) => {
      try {
        const response = await fetch(`http://localhost:5001/poems/poems/${poemId}/share`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to toggle share status");
        }
  
        const data = await response.json();
        setPoems(poems.map((poem) => (poem._id === poemId ? {...poem, shared: !poem.shared} : poem)));
        console.log('URL received from backend:', data.url);
       
    console.log('Navigating to path:', data.url);
    navigate(data.url); // Use the path for navigation
      } catch (error) {
        console.error("Error toggling share:", error);
      }
    };

    const handleDelete = async (poemId) => {
      try {
        const response = await fetch(`http://localhost:5001/poems/${poemId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to delete poem");
        }
        console.log(`Poem deleted with ID: ${poemId}`); // Log success
        setPoems(poems.filter((poem) => poem._id !== poemId));
      } catch (error) {
        console.error("Error deleting poem:", error);
      }
    };

   // Fetch poems when the component mounts
   useEffect(() => {
    const fetchPoems = async () => {
      if (token) {
        try {
          const response = await fetch("http://localhost:5001/poems", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch poems");
          }
          const poemsData = await response.json();
          setPoems(poemsData);
        } catch (error) {
          console.error("Error fetching poems:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPoems();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <div className="navigation">{/* Navigation component or links here */}</div>
      <div className="user-info">{/* User information display */}</div>
      <div className="poems-section">
        <h3>My Poems</h3>
        {poems.map((poem) => (
          <div key={poem._id} className="poem">
            <p>{poem.content}</p>
            <div className="actions">
              <img src={poem.liked ? likedIcon : notlikedIcon} alt="like" onClick={() => handleLike(poem._id)} />
              <img src={poem.shared ? sharedIcon : notsharedIcon} alt="share" onClick={() => handleShare(poem._id)} />
              <img src={deleteIcon} alt="delete" onClick={() => handleDelete(poem._id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
