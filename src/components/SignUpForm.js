/* src/components/SignupForm.js */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupForm.css'; // Make sure to create this CSS file

const SignupForm = ({ onSignUp }) => {
  // Define state for each input field
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthday: '',
    username: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const navigate = useNavigate(); // Initialize navigate hook

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    if (!formData.termsAccepted) {
      alert("You must agree to the terms and services");
      return;
    }

    // Sign-up logic
    try {
      const response = await fetch('http://localhost:5001/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Store the token
        navigate('/random-words'); // Redirect to user profile
      } else {
        alert(`Signup failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Signup failed:', error);
      alert(`Signup failed: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      {/* Fields based on the mockup */}
      <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Chosen First Name" required />
      <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Chosen Last Name" required />
      <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email Address" required />
      <input name="birthday" value={formData.birthday} onChange={handleChange} type="date" placeholder="Birthday" required />
      <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
      <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Password" required />
      <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" placeholder="Confirm Password" required />
      <label>
        <input name="termsAccepted" type="checkbox" checked={formData.termsAccepted} onChange={handleChange} />
        I agree to terms and services
      </label>
      <button type="submit" className="signup-button">CONTINUE</button>
    </form>
  );
};

export default SignupForm;