// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FlightStatusPage from './pages/FlightStatusPage';
import ItineraryPage from './pages/ItineraryPage';
import AccountPage from './pages/AccountPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flight-status" element={<FlightStatusPage />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
