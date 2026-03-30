import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Gift } from 'lucide-react';

const Navbar = () => {
  return (
    <nav>
      <div className="container nav-content">
        <Link to="/" className="logo">
          <Gift size={24} color="var(--primary)" />
          Happy Box
        </Link>
        <div className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/events">Explore Us</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>
        </div>
        <div className="nav-actions">
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
