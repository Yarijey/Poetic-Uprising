// src/App.js

import React, { useState } from 'react';
import HomePage from './components/HomePage';
import RandomWords from './components/RandomWords';
import GlobalStyle from './globalStyle';

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
      {!isLoggedIn ? (
        <HomePage onAuthenticationSuccess={handleAuthenticationSuccess} />
      ) : (
        <RandomWords includeDetails={false} />
      )}
    </>
  );
};

export default App;