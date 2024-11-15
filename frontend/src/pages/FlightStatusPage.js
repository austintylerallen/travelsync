// frontend/FlightStatusPage.js
import React, { useState } from 'react';
import axios from 'axios';
import './FlightStatusPage.css';

function FlightStatusPage() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [flightStatus, setFlightStatus] = useState([]);
  const [error, setError] = useState('');

  const fetchFlightStatus = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.get(`/api/flight-status/live`, {
        params: { origin, destination },
      });
      setFlightStatus(response.data);
    } catch (error) {
      console.error('Error fetching flight status:', error);
      setError('Failed to fetch flight data.');
    }
  };

  return (
    <div className="flight-status-page">
      <h1>Flight Booking</h1>
      <form onSubmit={fetchFlightStatus} className="flight-form">
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value.toUpperCase())}
          placeholder="Origin Airport Code"
          className="input-field"
        />
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value.toUpperCase())}
          placeholder="Destination Airport Code"
          className="input-field"
        />
        <button type="submit" className="search-button">Search Flights</button>
      </form>

      {error && <p className="error">{error}</p>}

      {flightStatus.length > 0 && (
        <div className="flights-container">
          {flightStatus.map((flight, index) => (
            <div key={index} className="flight-card">
              <div className="flight-info">
                <p className="flight-carrier">{flight.carrierCode} {flight.flightNumber}</p>
                <p><strong>From:</strong> {flight.origin}</p>
                <p><strong>To:</strong> {flight.destination}</p>
                <p><strong>Departure:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
                <p><strong>Arrival:</strong> {new Date(flight.arrivalTime).toLocaleString()}</p>
                <p><strong>Duration:</strong> {flight.duration}</p>
                <p className="flight-price"><strong>Price:</strong> ${flight.price}</p>
              </div>
              <button className="book-button">Book Now</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FlightStatusPage;
