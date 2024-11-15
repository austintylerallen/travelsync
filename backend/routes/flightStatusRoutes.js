const express = require('express');
const router = express.Router();
const fetchFlightsFromAmadeus = require('../fetchFlights');

router.get('/live', async (req, res) => {
  try {
    const { origin, destination } = req.query;
    console.log('Received query parameters:', { origin, destination });

    const flightData = await fetchFlightsFromAmadeus({ origin, destination });

    if (!flightData || flightData.length === 0) {
      return res.status(404).json({ message: 'No flight data found for the specified criteria.' });
    }

    res.json(flightData);
  } catch (error) {
    console.error('Error fetching flight data:', error);
    res.status(500).json({ message: 'Error fetching flight data', error: error.message });
  }
});

module.exports = router;
