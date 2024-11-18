const express = require('express');
const router = express.Router();
const { createFlightOrder } = require('../services/flightOrderService');

router.post('/create', async (req, res) => {
  try {
    const { flightOffer, passengers } = req.body;

    if (!flightOffer || !passengers) {
      return res.status(400).json({ message: 'Flight offer and passenger details are required' });
    }

    const flightOrderId = await createFlightOrder(flightOffer, passengers);
    res.status(201).json({ flightOrderId });
  } catch (error) {
    console.error('Error creating flight order:', error.message);
    res.status(500).json({ message: 'Failed to create flight order', error: error.message });
  }
});

module.exports = router;
