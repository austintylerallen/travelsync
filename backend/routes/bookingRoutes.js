// routes/bookingRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, (req, res) => {
  // This will fetch bookings for the authenticated user
  res.json({ message: 'Fetch user bookings' });
});

router.post('/', authMiddleware, (req, res) => {
  // This will create a booking for the authenticated user
  res.json({ message: 'Booking created' });
});

module.exports = router;
