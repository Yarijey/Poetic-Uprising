// src/components/UrlSharedPoem.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UrlSharedPoem = () => {
    const { poemId } = useParams();
    const [poem, setPoem] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log('Poem ID from URL:', poemId);  // Log the poem ID from URL parameters

    useEffect(() => {
        const fetchPoem = async () => {
          console.log(`Fetching poem with ID: ${poemId}`);  // Log before fetching
            try {
                const response = await fetch(`http://localhost:5001/public-poems/${poemId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch poem');
                }
                const data = await response.json();
                setPoem(data);
                console.log('Fetched poem data:', data);  // Log fetched data
            } catch (error) {
                console.error("Error fetching poem:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPoem();
    }, [poemId]);

    if (loading) return <p>Loading...</p>;
    if (!poem) return <p>Poem not found.</p>;

    return (
        <div>
            <h1>Shared Poem</h1>
            <p>{poem.content}</p>
        </div>
    );
};

export default UrlSharedPoem;
