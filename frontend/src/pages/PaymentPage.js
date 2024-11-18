import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentPage.css';

function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const flightDetails = state?.flightDetails || {};
  const selectedSeats = state?.selectedSeats || [];

  const handlePayment = () => {
    alert('Payment processing will be integrated here.');
    navigate('/confirmation', {
      state: {
        flightDetails,
        selectedSeats,
      },
    });
  };

  return (
    <div className="payment-page">
      <h1>Payment Page</h1>
      <div className="flight-summary">
        <h2>Flight Details</h2>
        <p><strong>From:</strong> {flightDetails.origin}</p>
        <p><strong>To:</strong> {flightDetails.destination}</p>
        <p><strong>Selected Seats:</strong> {selectedSeats.join(', ')}</p>
        <p><strong>Total Price:</strong> ${(flightDetails.price?.total * selectedSeats.length).toFixed(2)}</p>
      </div>
      <button className="pay-button" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
}

export default PaymentPage;
