const mongoose = require('mongoose');

const PassengerInfoSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  passportNumber: { type: String },
});

const BookingSchema = new mongoose.Schema({
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true }, // Ensure this field is a number
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  carrierCode: { type: String, required: true },
  flightNumber: { type: String, required: true },
  passengerInfo: { type: PassengerInfoSchema, required: true },
});

module.exports = mongoose.model('Booking', BookingSchema);
