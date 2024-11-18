const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

const flightStatusRoutes = require('./routes/flightStatusRoutes');
const itineraryRoutes = require('./routes/itineraryRoutes');
const bookingRoutes = require('./routes/bookingRoutes'); // Import the booking routes
const authRoutes = require('./routes/authRoutes');
const seatmapRoutes = require('./routes/seatmapRoutes');
const flightOrderRoutes = require('./routes/flightOrderRoutes');






dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/flight-status', flightStatusRoutes);
app.use('/api/itinerary', itineraryRoutes);
app.use('/api/bookings', bookingRoutes); // Use the booking routes under the /api prefix
app.use('/api/auth', authRoutes);
app.use('/api/seatmaps', seatmapRoutes);
app.use('/api/flight-orders', flightOrderRoutes);

// Set the port
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
