import React, { useState } from 'react';
import axios from 'axios';
import './FlightStatusPage.css';

function FlightStatusPage() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [flightStatus, setFlightStatus] = useState([]);
  const [error, setError] = useState('');

  // Fetch flight status based on origin, destination, departure date, and number of adults
  const fetchFlightStatus = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await axios.get(`/api/flight-status/live`, {
        params: { origin, destination, departureDate, adults },
      });
      setFlightStatus(response.data);
    } catch (error) {
      console.error('Error fetching flight status:', error);
      setError('Failed to fetch flight data.');
    }
  };

  // Handle booking a flight
  const handleBooking = async (flight) => {
    try {
      const response = await axios.post('/api/book', flight, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Flight booked successfully!');
    } catch (error) {
      alert('Failed to book the flight.');
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
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          placeholder="Departure Date"
          className="input-field"
        />
        <input
          type="number"
          min="1"
          value={adults}
          onChange={(e) => setAdults(Number(e.target.value))}
          placeholder="Number of Adults"
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
      <p className="flight-carrier">
        {flight.carrierCode} {flight.flightNumber || ''}
      </p>
      <p><strong>From:</strong> {flight.origin || 'Unknown'}</p>
      <p><strong>To:</strong> {flight.destination || 'Unknown'}</p>
      <p>
        <strong>Departure:</strong> 
        {flight.departureTime ? new Date(flight.departureTime).toLocaleString() : 'Unknown'}
      </p>
      <p>
        <strong>Arrival:</strong> 
        {flight.arrivalTime ? new Date(flight.arrivalTime).toLocaleString() : 'Unknown'}
      </p>
      <p><strong>Duration:</strong> {flight.duration || 'Unknown'}</p>
      <p className="flight-price">
        <strong>Price:</strong> ${flight.price.total || 'Unknown'} 
        (Base: ${flight.price.base || 'Unknown'}, Fees: 
        {flight.price.fees 
          ? flight.price.fees.map((fee) => `${fee.amount} (${fee.type})`).join(', ') 
          : 'None'})
      </p>
    </div>
    <button className="book-button" onClick={() => handleBooking(flight)}>
      Book Now
    </button>
  </div>
))}

        </div>
      )}
    </div>
  );
}

export default FlightStatusPage;
