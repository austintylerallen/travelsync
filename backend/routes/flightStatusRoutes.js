const express = require('express');
const router = express.Router();
const fetchFlightsFromAmadeus = require('../fetchFlights');

router.get('/live', async (req, res) => {
  try {
    const { origin, destination, departureDate, adults } = req.query;
    console.log('Received query parameters:', { origin, destination, departureDate, adults });

    if (!origin || !destination || !departureDate || !adults) {
      return res.status(400).json({
        message: 'Missing required parameters: origin, destination, departureDate, and adults are required.',
      });
    }

    const parsedAdults = parseInt(adults, 10);
    if (isNaN(parsedAdults) || parsedAdults < 1) {
      return res.status(400).json({ message: 'Invalid value for adults: Must be a positive integer.' });
    }

    const { flights, dictionaries } = await fetchFlightsFromAmadeus({
      origin,
      destination,
      departureDate,
      adults: parsedAdults,
    });

    if (!flights || flights.length === 0) {
      return res.status(404).json({ message: 'No flight data found for the specified criteria.' });
    }

    // Respond with both flights and dictionaries
    res.json({ flights, dictionaries });
  } catch (error) {
    console.error('Error fetching flight data:', error.message);
    res.status(500).json({ message: 'Error fetching flight data', error: error.message });
  }
});

module.exports = router;
