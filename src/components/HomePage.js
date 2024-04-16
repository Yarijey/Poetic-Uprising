// src/components/HomePage.js

import React, { useState } from 'react';
import './HomePage.css'; // CSS file HomePage component
GlobalStyle
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import NavBar from './NavBar';
import GlobalStyle from '../globalStyle';
import Modal from './Modal';


const HomePage = ({ onAuthenticationSuccess }) => {
  // State to control whether to show the sign-up form
  const [activeForm, setActiveForm] = useState(null); // "login", "signup", or null

    // Define the function to call after successful authentication (either login or signup)
    const handleAuthenticationSuccess = (token) => {
      console.log("Authenticated successfully with token:", token);
      // store the token in local storage or context/state ?
      // redirect the user or update the UI to reflect the authentication state ?
      localStorage.setItem('authToken', token);
      // Redirect or update state here.
    };
  
  const handleLoginClick = () => {
    setActiveForm("login");
  };

  const handleJoinClick = () => {
    setActiveForm("signup");
  };

  const [isAboutOpen, setAboutOpen] = useState(false);

  const handleOpenAbout = () => {
    setAboutOpen(true);
  };

  const handleCloseAbout = () => {
    setAboutOpen(false);
  };

    // Function to handle signup submission
    const handleSignUp = async (formData) => {
      console.log("Sending formData to server:", formData);
      try {
        const response = await fetch('http://localhost:5001/users/signup', { // URL based on users.js set up 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          const data = await response.json();
          // Here you might want to do something with the response token
          // For now, let's just call onAuthenticationSuccess
          onAuthenticationSuccess(data);
        }
      } catch (error) {
        console.error('Signup failed:', error);
      }
    };

  return (
    <>
    <NavBar>
    <li><a href="/">Welcome</a></li>
    <li><a href="/" onClick={(e) => {
       e.preventDefault(); // Prevent the default link behavior
       handleOpenAbout(); // Call the logout function
      }} style={{ cursor: 'pointer' }}>
      About</a></li>
  </NavBar>
  <Modal isOpen={isAboutOpen} onClose={handleCloseAbout}>
        <h3>Poetic Uprisings</h3>
        <p>is designed to help users create and share their poetry. It includes features like...</p>
      </Modal>
    <div className="home-container">
      {activeForm === null && (
        <>
          <h1 className="sunflower-bold">POETIC </h1>
          <h2 className="sunflower-medium">UPRISINGS</h2>
          <p className="dm-mono-regular about-section">
          A creative space designed to empower and highlight QTBIPOC voices through poetry, this app
provides tools for crafting, editing, and sharing poetic works. It encourages engagement + exploration of a multitude of 
narratives and self-expression.
          </p>
          <div className="button-section">
            <button onClick={handleLoginClick} className="login-button">LOG IN</button>
            <button onClick={handleJoinClick} className="join-button">JOIN US</button>
          </div>
        </>
      )}
      {activeForm === "login" && (
        <LoginForm onAuthenticationSuccess={onAuthenticationSuccess} />
      )}
      {activeForm === "signup" && (
        <SignupForm onSignUp={handleSignUp} />
      )}
    </div>
    </>
  );
};

export default HomePage;