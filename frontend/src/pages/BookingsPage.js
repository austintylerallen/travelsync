import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookingsPage.css';

function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

  // Fetch bookings function
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('User not authenticated');

      const response = await axios.get(`${API_URL}/api/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Fetched bookings data:', response.data);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError(error.response?.data?.message || 'Failed to load bookings. Please try again later.');
    }
  };

  // Cancel booking function
  const handleCancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('User not authenticated');

      console.log('Attempting to cancel booking with ID:', bookingId); // Debug
      console.log('Request URL:', `${API_URL}/api/bookings/${bookingId}`); // Debug

      await axios.delete(`${API_URL}/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingId));
      alert('Booking cancelled successfully!');
    } catch (error) {
      console.error('Error cancelling booking:', error);
      setError(error.response?.data?.message || 'Failed to cancel booking. Please try again later.');
    }
  };

  // Format duration
  const formatDuration = (duration) => {
    if (!duration) return 'Unknown';
    return duration.replace('PT', '').replace('H', ' hours ').replace('M', ' minutes').trim();
  };

  // Fetch bookings on component mount
  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="bookings-page">
      <h1>Your Bookings</h1>
      {error && <p className="error">{error}</p>}
      <div className="bookings-container">
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <div key={index} className="booking-card">
              <p><strong>Flight:</strong> {booking.flightNumber}</p>
              <p><strong>From:</strong> {booking.origin}</p>
              <p><strong>To:</strong> {booking.destination}</p>
              <p><strong>Departure:</strong> {new Date(booking.departureTime).toLocaleString()}</p>
              <p><strong>Arrival:</strong> {new Date(booking.arrivalTime).toLocaleString()}</p>
              <p><strong>Duration:</strong> {formatDuration(booking.duration)}</p>
              <p className="flight-price"><strong>Price:</strong> ${booking.price}</p>
              <p className="booked-at">Booked on: {new Date(booking.bookedAt).toLocaleDateString()}</p>
              <button
                className="cancel-button"
                onClick={() => handleCancelBooking(booking._id)}
              >
                Cancel Booking
              </button>
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
}

export default BookingsPage;
