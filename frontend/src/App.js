// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import FlightStatusPage from './pages/FlightStatusPage';
import ItineraryPage from './pages/ItineraryPage';
import AccountPage from './pages/AccountPage';
import BookingsPage from './pages/BookingsPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flight-status" element={<FlightStatusPage />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/account" />} />
        <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/account" />} />
        <Route path="/bookings" element={isAuthenticated ? <BookingsPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
