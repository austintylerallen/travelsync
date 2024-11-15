const axios = require('axios');
require('dotenv').config();

const fetchFlightsFromAmadeus = async ({ origin, destination, departureDate, adults }) => {
  console.log('Fetching flights from Amadeus API with:', { origin, destination, departureDate, adults });

  try {
    // Authenticate with Amadeus
    const authResponse = await axios.post(
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

    const accessToken = authResponse.data.access_token;

    // Fetch flight offers
    const response = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate,
        adults,
      },
    });

    // Map and format the data
    const flights = response.data.data.map((offer) => {
      const itinerary = offer.itineraries[0]; // Assuming single itinerary
      return {
        carrierCode: offer.validatingAirlineCodes[0],
        flightNumber: offer.id, // Placeholder, adapt if specific flight numbers exist
        origin: itinerary.segments[0].departure.iataCode,
        destination: itinerary.segments[itinerary.segments.length - 1].arrival.iataCode,
        departureTime: itinerary.segments[0].departure.at,
        arrivalTime: itinerary.segments[itinerary.segments.length - 1].arrival.at,
        duration: itinerary.duration,
        price: offer.price,
      };
    });

    console.log('Formatted flights:', flights);
    return flights;
  } catch (error) {
    console.error('Amadeus API error:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.errors?.[0]?.detail || 'Bad request: Check your parameters (e.g., origin, destination, dates).'
    );
  }
};

module.exports = fetchFlightsFromAmadeus;
