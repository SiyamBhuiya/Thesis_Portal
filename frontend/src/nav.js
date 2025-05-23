import React from 'react';
import {Link} from 'react-router-dom';
const Nav= () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    
    <div>
        <h1>Thesis portal</h1>
    </div>
    </nav>
  );
} 

export default Nav;