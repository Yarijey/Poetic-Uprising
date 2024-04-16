// src/components/UserSharedPoems.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./UserSharedPoems.css";
import NavBar from "./NavBar";

const UserSharedPoems = () => {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/poems?shared=true",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
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
    };
    fetchPoems();
  }, [token]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
    <NavBar> 
    <li><a href="/">Welcome</a></li>
    <li><a href="/random-words"> Create Poems</a></li>
    <li><a href="/user-profile"> Saved Poems</a></li>
    <li><a href="/" onClick={(e) => {
    e.preventDefault(); // Prevent the default link behavior
    handleLogout(); // Call the logout function
  }} style={{ cursor: 'pointer' }}>
    Logout
  </a>
  </li>
  </NavBar>
    <div className="user-shared-poems">
      <h1 className="shared-poem-header">My Shared Poems</h1>
      {poems.map((poem) => (
         <div key={poem._id} className="poem-container">
          <p className="poem-content">{poem.content}</p>
          <Link to={`/public-poems/${poem._id}`} className="poem-link">View Public Link</Link>
          </div>
      ))}
    </div>
  </>
)};

export default UserSharedPoems;
