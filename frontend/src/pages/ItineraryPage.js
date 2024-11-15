// src/pages/ItineraryPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ItineraryPage() {
  const [itinerary, setItinerary] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await axios.get('/api/itinerary');
        setItinerary(response.data);
      } catch (err) {
        setError('Failed to load itinerary.');
        console.error(err);
      }
    };
    
    fetchItinerary();
  }, []);

  return (
    <div>
      <h1>Your Itinerary</h1>
      {error && <p>{error}</p>}
      {itinerary.length > 0 ? (
        itinerary.map((item, index) => (
          <div key={index} className="itinerary-item">
            <h2>{item.flightNumber}</h2>
            <p>From: {item.origin}</p>
            <p>To: {item.destination}</p>
            <p>Departure: {item.departureTime}</p>
            <p>Arrival: {item.arrivalTime}</p>
          </div>
        ))
      ) : (
        <p>No itinerary available.</p>
      )}
    </div>
  );
}

export default ItineraryPage;
