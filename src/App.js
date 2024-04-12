// src/App.js

import React, {useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import RandomWords from './components/RandomWords';
import GlobalStyle from './globalStyle';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import UserProfile from './components/UserProfile';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks whether user is logged in
  

   // function called when user successfully logs in or signs up
   const handleAuthenticationSuccess = (token) => {
    localStorage.setItem('token', token); // Save token in local storage
    setIsLoggedIn(true); // Update state to reflect user is logged in
  };

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage onAuthenticationSuccess={handleAuthenticationSuccess} />} />
        <Route path="/login" element={<LoginForm onAuthenticationSuccess={handleAuthenticationSuccess} />} />
        <Route path="/signup" element={<SignupForm onAuthenticationSuccess={handleAuthenticationSuccess} />} />
        <Route path="/random-words" element={<RandomWords includeDetails={false} />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </>
  );
};

export default App;