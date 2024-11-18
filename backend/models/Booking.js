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
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  carrierCode: { type: String, required: true },
  flightNumber: { type: String, required: true },
  passengerInfo: {
    fullName: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  flightOrderId: { type: String, required: true }, // Ensure this is included
}, { timestamps: true });



module.exports = mongoose.model('Booking', BookingSchema);
