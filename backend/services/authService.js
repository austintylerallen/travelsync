const axios = require('axios');
const { mockVisualSeatMap } = require('../services/mockVisualSeatMap');

const AMADEUS_API_URL = 'https://test.api.amadeus.com';
const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY;
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET;

// Function to fetch an access token from Amadeus
const getAmadeusAccessToken = async () => {
  try {
    const response = await axios.post(
      `${AMADEUS_API_URL}/v1/security/oauth2/token`,
      `grant_type=client_credentials&client_id=${AMADEUS_API_KEY}&client_secret=${AMADEUS_API_SECRET}`,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );
    console.log('Amadeus access token fetched successfully');
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching Amadeus access token:', error.response?.data || error.message);
    throw error;
  }
};

// Function to fetch seat map from Amadeus API with fallback to mock data
const getSeatMap = async (flightOrderId) => {
  try {
    const token = await getAmadeusAccessToken();
    const response = await axios.get(`${AMADEUS_API_URL}/v1/shopping/seatmaps`, {
      params: { flightOrderId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Seat map fetched successfully from Amadeus API');
    return response.data;
  } catch (error) {
    console.error('Error fetching seat map from Amadeus API:', error.response?.data || error.message);
    console.log('Falling back to mock seat map data');
    return mockVisualSeatMap; // Fallback to mock data
  }
};

module.exports = { getAmadeusAccessToken, getSeatMap };
