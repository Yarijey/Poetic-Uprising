// src/components/NavBar.js

import React from 'react';
import './NavBar.css'; // This is where you'd import your CSS from

const NavBar = ({ children }) => {
  return (
    <nav>
      <ul className="nav-list">{children}</ul>
    </nav>
  );
};

export default NavBar;
