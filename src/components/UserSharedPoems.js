// src/components/UserSharedPoems.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    <div>
      <h1>My Shared Poems</h1>
      {poems.map((poem) => (
        <div key={poem._id}>
          <p>{poem.content}</p>
          <Link to={`/public-poems/${poem._id}`}>View Public Link</Link>
        </div>
      ))}
    </div>
  );
};

export default UserSharedPoems;
