const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/seatmap', async (req, res) => {
  try {
    const { flightId } = req.query;

    const tokenResponse = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.AMADEUS_API_KEY,
        client_secret: process.env.AMADEUS_API_SECRET,
      }).toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    const seatMapResponse = await axios.get(
      `https://test.api.amadeus.com/v1/shopping/seatmaps?flightOrderId=${flightId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    res.json(seatMapResponse.data);
  } catch (error) {
    console.error('Error fetching seat map:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to fetch seat map' });
  }
});

module.exports = router;
