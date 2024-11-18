import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SeatSelectionPage.css';

function SeatSelectionPage() {
  const { flightId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const flightDetails = state?.flightDetails || {};
  const [seatMapData, setSeatMapData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const numberOfPassengers = state?.passengerCount || 1; // Assuming passenger count is passed in state

  useEffect(() => {
    const fetchSeatMap = async () => {
      setLoading(true);
      setError('');
      try {
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
        const response = await axios.get(`${API_URL}/api/seatmaps`, { params: { flightId } });
        setSeatMapData(response.data.rows || []);
      } catch (error) {
        setError('Failed to fetch seat map.');
      } finally {
        setLoading(false);
      }
    };

    fetchSeatMap();
  }, [flightId]);

  const handleSeatClick = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      // Deselect seat
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else if (selectedSeats.length < numberOfPassengers) {
      // Select seat
      setSelectedSeats([...selectedSeats, seatId]);
    } else {
      alert(`You can only select up to ${numberOfPassengers} seat(s).`);
    }
  };

  const handleConfirmSeats = () => {
    if (selectedSeats.length !== numberOfPassengers) {
      alert(`Please select ${numberOfPassengers} seat(s) to continue.`);
      return;
    }

    // Navigate to payment page, passing selected seats and flight details
    navigate('/payment', {
      state: {
        flightDetails,
        selectedSeats,
      },
    });
  };

  return (
    <div className="seat-selection-page">
      <div className="flight-summary">
        <h2>Flight Details</h2>
        <p><strong>From:</strong> {flightDetails.origin || 'N/A'}</p>
        <p><strong>To:</strong> {flightDetails.destination || 'N/A'}</p>
        <p><strong>Departure:</strong> {flightDetails.departureTime || 'N/A'}</p>
        <p><strong>Arrival:</strong> {flightDetails.arrivalTime || 'N/A'}</p>
        <p><strong>Price:</strong> ${flightDetails.price?.total || 'N/A'}</p>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="decks-container">
        {loading ? (
          <p>Loading seat map...</p>
        ) : (
          seatMapData.map((row, index) => (
            <div key={index} className="row">
              {row.seats.map((seat, seatIndex) => {
                const seatId = `${row.rowNumber}${seat}`;
                const isOccupied = seat.isOccupied || false;
                const isSelected = selectedSeats.includes(seatId);

                return (
                  <button
                    key={seatId}
                    className={`seat ${isOccupied ? 'occupied' : ''} ${isSelected ? 'selected' : ''}`}
                    disabled={isOccupied}
                    onClick={() => handleSeatClick(seatId)}
                  >
                    {seatId}
                  </button>
                );
              })}
            </div>
          ))
        )}
      </div>
      {selectedSeats.length > 0 && (
        <div>
          <p>Selected Seats: {selectedSeats.join(', ')}</p>
          <button className="confirm-button" onClick={handleConfirmSeats}>
            Confirm and Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
}

export default SeatSelectionPage;
