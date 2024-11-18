// const axios = require('axios');

// const AMADEUS_API_URL = 'https://test.api.amadeus.com';
// const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY;
// const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET;

// // Function to fetch an access token from Amadeus
// const getAmadeusAccessToken = async () => {
//   try {
//     const response = await axios.post(
//       `${AMADEUS_API_URL}/v1/security/oauth2/token`,
//       `grant_type=client_credentials&client_id=${AMADEUS_API_KEY}&client_secret=${AMADEUS_API_SECRET}`,
//       {
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       }
//     );
//     return response.data.access_token;
//   } catch (error) {
//     console.error('Error fetching Amadeus access token:', error.response?.data || error.message);
//     throw error;
//   }
// };

// // Function to create a flight order
// const createFlightOrder = async (flightOffer, passengers) => {
//   try {
//     const token = await getAmadeusAccessToken();
//     const response = await axios.post(
//       `${AMADEUS_API_URL}/v1/booking/flight-orders`,
//       {
//         data: {
//           type: 'flight-order',
//           flightOffers: [flightOffer],
//           travelers: passengers,
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//     console.log('Flight order created successfully:', response.data);
//     return response.data; // Return full response to capture `id`
//   } catch (error) {
//     console.error('Error creating flight order:', error.response?.data || error.message);
//     throw error;
//   }
// };

// // Function to fetch seat map from Amadeus API
// const getSeatMap = async (flightOrderId) => {
//   try {
//     const token = await getAmadeusAccessToken();
//     const response = await axios.get(`${AMADEUS_API_URL}/v1/shopping/seatmaps`, {
//       params: { flightOrderId },
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching seat map from Amadeus:', error.response?.data || error.message);
//     throw error;
//   }
// };

// module.exports = { getAmadeusAccessToken, createFlightOrder, getSeatMap };



const axios = require('axios');
const { mockVisualSeatMap } = require('../services/mockVisualSeatMap');
const { getAmadeusAccessToken } = require('./authService'); // Ensure you have this service to get tokens

const AMADEUS_API_URL = 'https://test.api.amadeus.com';

const getSeatMap = async (flightOrderId) => {
  try {
    const token = await getAmadeusAccessToken();
    const response = await axios.get(`${AMADEUS_API_URL}/v1/shopping/seatmaps`, {
      params: { flightOrderId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching seat map from Amadeus API:', error.response?.data || error.message);
    return mockVisualSeatMap; // Fallback to mock data
  }
};

module.exports = { getSeatMap };
