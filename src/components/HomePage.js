// src/components/HomePage.js

import React, { useState } from 'react';
import './HomePage.css'; // CSS file HomePage component
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';



const HomePage = ({ onAuthenticationSuccess }) => {
  // State to control whether to show the sign-up form
  const [activeForm, setActiveForm] = useState(null); // "login", "signup", or null

  const handleLoginClick = () => {
    setActiveForm("login");
  };

  const handleJoinClick = () => {
    setActiveForm("signup");
  };

  return (
    <div className="home-container">
      {activeForm === null && (
        <>
        <p className="dm-mono-regular about-section">
          Welcome
        </p>
        <p className="dm-mono-regular about-section">
          About
        </p>
          <h1 className="sunflower-bold">POETIC UPRISINGS</h1>
          <p className="dm-mono-regular about-section">
          A creative space designed to empower and highlight QTBIPOC voices through poetry, this app
provides tools for crafting, editing, and sharing poetic works. it encourages engagement + exploration of a multitude of 
narratives and self-expression.
          </p>
          <div className="button-section">
            <button onClick={handleLoginClick} className="login-button">LOG IN</button>
            <button onClick={handleJoinClick} className="join-button">JOIN US</button>
          </div>
        </>
      )}
      {activeForm === "login" && (
        <LoginForm onLoginSuccess={onAuthenticationSuccess} />
      )}
      {activeForm === "signup" && (
        <SignupForm onSignupSuccess={onAuthenticationSuccess} />
      )}
    </div>
  );
};

export default HomePage;