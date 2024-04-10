// src/components/HomePage.js

import React from 'react';
import './HomePage.css'; // CSS file HomePage component
import LoginForm from './LoginForm';
import SignUpForm from './SignupForm';



const HomePage = ({ onLoginSuccess, onSignUpSuccess }) => {
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
          <h1 className="sunflower-bold">POETIC UPRISINGS</h1>
          <p className="dm-mono-regular about-section">
            A creative space designed to empower and highlight QTBIPOC voices through poetry...
          </p>
          <div className="button-section">
            <button onClick={handleLoginClick} className="login-button">LOG IN</button>
            <button onClick={handleJoinClick} className="join-button">JOIN US</button>
          </div>
        </>
      )}
      {activeForm === "login" && (
        <LoginForm onLoginSuccess={onLoginSuccess} />
      )}
      {activeForm === "signup" && (
        <SignUpForm onSignUpSuccess={onSignUpSuccess} />
      )}
    </div>
  );
};

export default HomePage;