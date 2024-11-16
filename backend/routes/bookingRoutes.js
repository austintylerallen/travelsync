const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/bookings/book
router.post('/book', authMiddleware, async (req, res) => {
    try {
      const { departureTime, arrivalTime, duration, price, ...otherData } = req.body;
  
      if (!duration) {
        return res.status(400).json({ message: 'Duration is required.' });
      }
  
      const bookingData = {
        ...otherData,
        user: req.user._id,
        departureTime: new Date(departureTime),
        arrivalTime: new Date(arrivalTime),
        duration, // Save duration directly
        price: parseFloat(price),
      };
  
      const newBooking = new Booking(bookingData);
      await newBooking.save();
  
      res.status(201).json(newBooking);
    } catch (error) {
      console.error('Booking creation error:', error.message);
      res.status(500).json({ message: 'Booking failed', error: error.message });
    }
  });
  
  

// GET /api/bookings
router.get('/', authMiddleware, async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const bookings = await Booking.find({ user: req.user._id });
      res.json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ message: 'Failed to retrieve bookings', error: error.message });
    }
  });
  

// Delete a booking
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Find the booking and delete it
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling booking:', error.message);
    res.status(500).json({ message: 'Error cancelling booking', error: error.message });
  }
});

module.exports = router;
