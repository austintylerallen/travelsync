const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Booking = require('../models/Booking');
const { getSeatMap } = require('../services/seatMapService');
const { mockVisualSeatMap } = require('../services/mockVisualSeatMap');

router.get('/', async (req, res) => {
  try {
    const { flightId } = req.query;

    if (!flightId) {
      return res.status(400).json({ message: 'Flight ID is required.' });
    }

    // Handle mock data directly if flightId is "MOCK12345"
    if (flightId === 'MOCK12345') {
      console.log('Using mock data for flight order.');
      return res.status(200).json(mockVisualSeatMap);
    }

    // Check if flightId is a valid ObjectId
    if (!mongoose.isValidObjectId(flightId)) {
      return res.status(400).json({ message: 'Invalid flight ID format.' });
    }

    const booking = await Booking.findById(flightId);

    if (!booking || !booking.flightOrderId) {
      return res.status(404).json({ message: 'Flight order ID not found for this booking.' });
    }

    const useMockData = process.env.USE_MOCK_DATA === 'true';

    let seatMapData;
    if (useMockData) {
      console.log('Using mock data for seat map.');
      seatMapData = mockVisualSeatMap;
    } else {
      seatMapData = await getSeatMap(booking.flightOrderId); // Fetch from Amadeus API
    }

    res.status(200).json(seatMapData);
  } catch (error) {
    console.error('Error fetching seat map:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to retrieve seat map', error: error.message });
  }
});

module.exports = router;
