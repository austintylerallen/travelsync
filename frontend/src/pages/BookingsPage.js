import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookingsPage.css';

function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('User not authenticated');
  
        const response = await axios.get('/api/bookings', {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log('Bookings data:', response.data); // Debug here
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError(error.response?.data?.message || 'Failed to load bookings. Please try again later.');
      }
    };
  
    fetchBookings();
  }, []);
  

  return (
    <div className="bookings-page">
      <h1>Your Bookings</h1>
      {error && <p className="error">{error}</p>}
      <div className="bookings-container">
        {bookings.map((booking, index) => (
          <div key={index} className="booking-card">
            <p><strong>Flight:</strong> {booking.flightNumber}</p>
            <p><strong>From:</strong> {booking.origin}</p>
            <p><strong>To:</strong> {booking.destination}</p>
            <p><strong>Departure:</strong> {new Date(booking.departureTime).toLocaleString()}</p>
            <p><strong>Arrival:</strong> {new Date(booking.arrivalTime).toLocaleString()}</p>
            <p><strong>Duration:</strong> {booking.duration}</p>
            <p className="flight-price"><strong>Price:</strong> ${booking.price}</p>
            <p className="booked-at">Booked on: {new Date(booking.bookedAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingsPage;
