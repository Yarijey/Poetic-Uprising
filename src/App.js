// src/App.js

import React, {useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import RandomWords from './components/RandomWords';
import GlobalStyle from './globalStyle';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import UserProfile from './components/UserProfile';
import UrlSharedPoem from './components/UrlSharedPoem'; // individual shared poem page
import UserSharedPoems from './components/UserSharedPoems'; // for user-specific shared poems page


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks whether user is logged in
  

   // function called when user successfully logs in or signs up
   const handleAuthenticationSuccess = (token) => {
    localStorage.setItem('token', token); // Save token in local storage
    setIsLoggedIn(true); // Update state to reflect user is logged in
  };

  // function to logout user
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to the login page after logout
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
        <Route path="/user-shared-poems" element={<UserSharedPoems />} />
        <Route path="/public-poems/:poemId" element={<UrlSharedPoem />} />
      </Routes>
    </>
  );
};

export default App;