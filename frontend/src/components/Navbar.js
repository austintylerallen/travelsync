// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import './Navbar.css';

function Navbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  console.log('Navbar Authentication Status:', isAuthenticated); // Debugging line

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/flight-status">Flight Status</Link></li>
        <li><Link to="/itinerary">Itinerary</Link></li>
        {isAuthenticated ? (
          <>
            <li><Link to="/account">Account</Link></li>
            <li><Link to="/bookings">Bookings</Link></li>
            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
