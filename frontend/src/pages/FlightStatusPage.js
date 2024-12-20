import React, { useState } from 'react';
import axios from 'axios';
import FlightInfoModal from '../components/FlightInfoModal';
import '../components/FlightInfoModal.css';
import './FlightStatusPage.css';

// Utility functions
const formatDuration = (duration) => {
  if (!duration) return 'Unknown';
  return duration.replace('PT', '').replace('H', ' hours ').replace('M', ' minutes').trim();
};

const formatDateTime = (dateTime) => {
  if (!dateTime) return 'Unknown';
  const date = new Date(dateTime);
  return date.toLocaleString();
};

function FlightStatusPage() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [flightStatus, setFlightStatus] = useState([]);
  const [error, setError] = useState('');
  const [showPassengerForm, setShowPassengerForm] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [passengerInfo, setPassengerInfo] = useState({
    fullName: '',
    dob: '',
    gender: '',
    email: '',
    phone: '',
    passportNumber: '', // Optional
  });

  const airlineNames = {
    F9: 'Frontier Airlines',
    UA: 'United Airlines',
    B6: 'JetBlue Airways',
    AA: 'American Airlines',
    DL: 'Delta Air Lines',
    AS: 'Alaska Airlines',
    WN: 'Southwest Airlines',
    NK: 'Spirit Airlines',
    TK: 'Turkish Airlines',
  };

  const fetchFlightStatus = async (e) => {
    e.preventDefault();
    setError('');
    setFlightStatus([]);

    try {
      const response = await axios.get(`http://localhost:5001/api/flight-status/live`, {
        params: { origin, destination, departureDate, adults },
      });

      console.log('Received flight data:', response.data);
      if (response.data.flights && response.data.flights.length > 0) {
        setFlightStatus(response.data.flights);
      } else {
        setError('No flights found for the given criteria.');
      }
    } catch (error) {
      console.error('Error fetching flight data:', error);
      setError('Failed to fetch flight data. Please check your inputs and try again.');
    }
  };

  const handleOpenPassengerForm = (flight) => {
    setSelectedFlight(flight);
    setShowPassengerForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPassengerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleBooking = async () => {
    // Extracting all fields needed for booking
    try {
      const { fullName, dob, gender, email, phone } = passengerInfo;
      if (!fullName || !dob || !gender || !email || !phone) {
        alert('Please fill in all required passenger details.');
        return;
      }
  
      // Ensure price is being sent correctly
      if (!selectedFlight?.price?.total) {
        alert('Flight price is not available.');
        return;
      }
  
      const bookingData = {
        departureTime: selectedFlight.departureTime,
        arrivalTime: selectedFlight.arrivalTime,
        duration: selectedFlight.duration,
        price: parseFloat(selectedFlight.price.total), // Ensure price is a valid number
        origin: selectedFlight.origin,
        destination: selectedFlight.destination,
        carrierCode: selectedFlight.carrierCode,
        flightNumber: selectedFlight.flightNumber,
        passengerInfo,
      };
  
      console.log('Booking data sent to server:', bookingData);
  
      const response = await axios.post(`http://localhost:5001/api/bookings/book`, bookingData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
  
      alert('Flight booked successfully!');
      setShowPassengerForm(false);
    } catch (error) {
      console.error('Error booking flight:', error.response?.data || error.message);
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
                  {airlineNames[flight.carrierCode] || flight.carrierCode || 'Unknown'} {flight.flightNumber || 'N/A'}
                </p>
                <p><strong>From:</strong> {flight.origin || 'Unknown'}</p>
                <p><strong>To:</strong> {flight.destination || 'Unknown'}</p>
                <p><strong>Departure:</strong> {formatDateTime(flight.departureTime)}</p>
                <p><strong>Arrival:</strong> {formatDateTime(flight.arrivalTime)}</p>
                <p><strong>Duration:</strong> {formatDuration(flight.duration)}</p>
                <p className="flight-price">
                  <strong>Price:</strong> ${flight.price?.total || 'Unknown'}
                </p>
              </div>
              <button
                type="button"
                className="book-button"
                onClick={() => handleOpenPassengerForm(flight)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Render FlightInfoModal */}
      {showPassengerForm && (
        <FlightInfoModal
          title="Passenger Information"
          onClose={() => setShowPassengerForm(false)}
        >
          <form>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={passengerInfo.fullName}
              onChange={handleInputChange}
              className="input-field"
            />
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={passengerInfo.dob}
              onChange={handleInputChange}
              className="input-field"
            />
            <select
              name="gender"
              value={passengerInfo.gender}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={passengerInfo.email}
              onChange={handleInputChange}
              className="input-field"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={passengerInfo.phone}
              onChange={handleInputChange}
              className="input-field"
            />
            <input
              type="text"
              name="passportNumber"
              placeholder="Passport Number (Optional)"
              value={passengerInfo.passportNumber}
              onChange={handleInputChange}
              className="input-field"
            />
            <button type="button" onClick={handleBooking} className="confirm-button">
              Confirm Booking
            </button>
            <button type="button" onClick={() => setShowPassengerForm(false)} className="cancel-button">
              Cancel
            </button>
          </form>
        </FlightInfoModal>
      )}
    </div>
  );
}

export default FlightStatusPage;
