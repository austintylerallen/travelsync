const mongoose = require('mongoose');

const FlightStatusSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true },
  airline: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  departureDate: { type: Date, required: true },
  arrivalDate: { type: Date, required: true },
  status: { type: String, required: true }, // e.g., 'On Time', 'Delayed', 'Cancelled'
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FlightStatus', FlightStatusSchema);
