const mongoose = require('mongoose');

const ItinerarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destination: { type: String, required: true },
  departureDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  flights: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FlightStatus' }], // References flight statuses
  notes: { type: String } // Optional field for user notes
});

module.exports = mongoose.model('Itinerary', ItinerarySchema);
