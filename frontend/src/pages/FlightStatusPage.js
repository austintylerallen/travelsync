// import React, { useState } from 'react';
// import axios from 'axios';
// import './FlightStatusPage.css';

// function FlightStatusPage() {
//   const [origin, setOrigin] = useState('');
//   const [destination, setDestination] = useState('');
//   const [departureDate, setDepartureDate] = useState('');
//   const [adults, setAdults] = useState(1);
//   const [flightStatus, setFlightStatus] = useState([]);
//   const [error, setError] = useState('');

//   // Fetch flight status
//   const fetchFlightStatus = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const response = await axios.get(`/api/flight-status/live`, {
//         params: { origin, destination, departureDate, adults },
//       });

//       console.log('Received flight data:', response.data); // Debug
//       setFlightStatus(response.data);
//     } catch (error) {
//       console.error('Error fetching flight data:', error);
//       setError('Failed to fetch flight data.');
//     }
//   };

//   // Format duration
//   const formatDuration = (duration) => {
//     if (!duration) return 'Unknown';
//     return duration.replace('PT', '').replace('H', ' hours ').replace('M', ' minutes').trim();
//   };

//   // Format date/time
//   const formatDateTime = (dateTime) => {
//     if (!dateTime) return 'Unknown';
//     const date = new Date(dateTime);
//     return date.toLocaleString();
//   };

//   // Handle booking a flight
//   const handleBooking = async (flight) => {
//     try {
//       const response = await axios.post('/api/book', flight, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       alert('Flight booked successfully!');
//     } catch (error) {
//       console.error('Error booking flight:', error);
//       alert('Failed to book the flight.');
//     }
//   };

//   return (
//     <div className="flight-status-page">
//       <h1>Flight Booking</h1>
//       <form onSubmit={fetchFlightStatus} className="flight-form">
//         <input
//           type="text"
//           value={origin}
//           onChange={(e) => setOrigin(e.target.value.toUpperCase())}
//           placeholder="Origin Airport Code"
//           className="input-field"
//         />
//         <input
//           type="text"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value.toUpperCase())}
//           placeholder="Destination Airport Code"
//           className="input-field"
//         />
//         <input
//           type="date"
//           value={departureDate}
//           onChange={(e) => setDepartureDate(e.target.value)}
//           placeholder="Departure Date"
//           className="input-field"
//         />
//         <input
//           type="number"
//           min="1"
//           value={adults}
//           onChange={(e) => setAdults(Number(e.target.value))}
//           placeholder="Number of Adults"
//           className="input-field"
//         />
//         <button type="submit" className="search-button">Search Flights</button>
//       </form>

//       {error && <p className="error">{error}</p>}

//       {flightStatus.length > 0 && (
//         <div className="flights-container">
//           {flightStatus.map((flight, index) => (
//             <div key={index} className="flight-card">
//               <div className="flight-info">
//                 <p className="flight-carrier">
//                   {flight.carrierCode} {flight.flightNumber}
//                 </p>
//                 <p><strong>From:</strong> {flight.origin}</p>
//                 <p><strong>To:</strong> {flight.destination}</p>
//                 <p><strong>Departure:</strong> {formatDateTime(flight.departureTime)}</p>
//                 <p><strong>Arrival:</strong> {formatDateTime(flight.arrivalTime)}</p>
//                 <p><strong>Duration:</strong> {formatDuration(flight.duration)}</p>
//                 <p className="flight-price">
//                   <strong>Price:</strong> ${flight.price?.total || 'Unknown'}
//                 </p>
//               </div>
//               <button
//                 className="book-button"
//                 onClick={() => handleBooking(flight)}
//               >
//                 Book Now
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default FlightStatusPage;

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

  // Airline code to name mapping
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

  // Fetch flight status
  const fetchFlightStatus = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.get(`/api/flight-status/live`, {
        params: { origin, destination, departureDate, adults },
      });

      console.log('Received flight data:', response.data); // Debug
      setFlightStatus(response.data);
    } catch (error) {
      console.error('Error fetching flight data:', error);
      setError('Failed to fetch flight data.');
    }
  };

  // Format duration
  const formatDuration = (duration) => {
    if (!duration) return 'Unknown';
    return duration.replace('PT', '').replace('H', ' hours ').replace('M', ' minutes').trim();
  };

  // Format date/time
  const formatDateTime = (dateTime) => {
    if (!dateTime) return 'Unknown';
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  // Get airline name
  const getAirlineName = (code) => airlineNames[code] || code || 'Unknown';

  // Handle booking a flight
  const handleBooking = async (flight) => {
    try {
      const bookingData = {
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
        duration: flight.duration, // Include duration
        price: parseFloat(flight.price.total), // Use total price
        origin: flight.origin,
        destination: flight.destination,
        carrierCode: flight.carrierCode,
        flightNumber: flight.flightNumber,
      };
  
      console.log('Booking data sent to server:', bookingData); // Debugging
  
      const response = await axios.post('/api/bookings/book', bookingData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
  
      alert('Flight booked successfully!');
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
                  {getAirlineName(flight.carrierCode)} {flight.flightNumber}
                </p>
                <p><strong>From:</strong> {flight.origin}</p>
                <p><strong>To:</strong> {flight.destination}</p>
                <p><strong>Departure:</strong> {formatDateTime(flight.departureTime)}</p>
                <p><strong>Arrival:</strong> {formatDateTime(flight.arrivalTime)}</p>
                <p><strong>Duration:</strong> {formatDuration(flight.duration)}</p>
                <p className="flight-price">
                  <strong>Price:</strong> ${flight.price?.total || 'Unknown'}
                </p>
              </div>
              <button
                className="book-button"
                onClick={() => handleBooking(flight)}
              >
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


