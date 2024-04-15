// src/ components/LoginForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
GlobalStyle
import './LoginForm.css'
import GlobalStyle from '../globalStyle';
import NavBar from './NavBar';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.token) {
        // If a token is returned, login is successful
        localStorage.setItem('token', data.token); // Store the token in local storage
        navigate('/random-words'); // Redirect to the user profile page or wherever you wish
      } else {
        // If no token is returned, handle login failure
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div className="login-container">
    <div className="login-form">
      <h2>Log In</h2>
      <p>Welcome back, poet!</p>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email address"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
          />
        </div>
        <div className="form-footer">
          <div className="remember-me">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <a href="/forgot-password" className="forgot-password">Forgot password</a>
        </div>
        <button type="submit" className="login2-button">Log In</button>
      </form>
    </div>
  </div>
);
};
export default LoginForm;