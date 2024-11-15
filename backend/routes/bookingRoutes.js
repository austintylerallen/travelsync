const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/bookings/book
router.post('/book', authMiddleware, async (req, res) => {
    try {
      const { departureTime, arrivalTime, price, ...otherData } = req.body;
  
      const bookingData = {
        ...otherData,
        user: req.user._id,
        departureTime: new Date(departureTime), // Ensure valid Date object
        arrivalTime: new Date(arrivalTime),    // Ensure valid Date object
        price: parseFloat(price),             // Ensure valid Number
      };
  
      const newBooking = new Booking(bookingData);
      await newBooking.save();
  
      res.status(201).json(newBooking);
    } catch (error) {
      console.error('Booking creation error:', error);
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
  

module.exports = router;
