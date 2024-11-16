import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Deck from '../components/Deck';
import './SeatSelectionPage.css';

function SeatSelectionPage() {
  const { flightId } = useParams();
  const [seatMapData, setSeatMapData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSeatMap = async () => {
      try {
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
        const response = await axios.get(`${API_URL}/api/seatmap`, {
          params: { flightId },
        });
        setSeatMapData(response.data.data[0].decks); // Adjust based on API response
      } catch (error) {
        console.error('Error fetching seat map:', error);
        setError('Failed to fetch seat map. Please try again later.');
      }
    };

    fetchSeatMap();
  }, [flightId]);

  return (
    <div className="seat-selection-page">
      <h1>Select Your Seat</h1>
      {error && <p className="error">{error}</p>}
      <div className="decks-container">
        {seatMapData.map((deck, index) => (
          <Deck key={index} deck={deck} />
        ))}
      </div>
    </div>
  );
}

export default SeatSelectionPage;
