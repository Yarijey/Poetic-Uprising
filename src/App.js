// src/App.js

import React, { useState } from 'react';
import HomePage from './components/HomePage';
import RandomWords from './components/RandomWords';
import GlobalStyle from './globalStyle';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks whether user is logged in

  // function called when user successfully logs in or signs up
  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token); // Save token in local storage token
    setIsLoggedIn(true); // Update state to reflect user is logged in
  };

  const handleSignUpSuccess = (token) => {
    localStorage.setItem('token', token); // Save the token in local storage
    setIsLoggedIn(true); // Update the state to reflect the user is logged in
  };

  return (
    <>
      <GlobalStyle />
      {isLoggedIn ? (
         <HomePage
         onLoginSuccess={handleLoginSuccess}
         onSignUpSuccess={handleSignUpSuccess}
       />
      ) : (
        <RandomWords includeDetails={false} />
      )}
    </>
  );
};

export default App;