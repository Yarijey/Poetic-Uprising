// src/components/NavBar.js

import React from 'react';
import './NavBar.css';
import Modal from './Modal';

const NavBar = ({ children }) => {
  return (
    <nav>
      <ul className="nav-list">{children}</ul>
    </nav>
  );
};

export default NavBar;
