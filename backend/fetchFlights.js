// backend/fetchFlights.js
const axios = require('axios');
require('dotenv').config();

const fetchFlightsFromAmadeus = async (params) => {
  const { origin, destination } = params;
  console.log("Fetching flights with parameters:", { origin, destination });

  try {
    // Step 1: Authenticate with Amadeus to get an access token
    const authParams = new URLSearchParams();
    authParams.append('grant_type', 'client_credentials');
    authParams.append('client_id', process.env.AMADEUS_API_KEY);
    authParams.append('client_secret', process.env.AMADEUS_API_SECRET);

    const authResponse = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      authParams.toString(), // Convert to string to ensure correct content type
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = authResponse.data.access_token;

    // Step 2: Use the access token to make a request to the Amadeus flight search API
    const response = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate: new Date().toISOString().split('T')[0], // Use current date
        adults: 1, // Set the number of travelers; adjust as necessary
      },
    });

    console.log('Amadeus API full response:', response.data);

    const flightData = response.data.data || [];
    if (!flightData.length) {
      console.log('No flights returned by Amadeus API');
      return [];
    }

    // Extract and map necessary flight information
    const mappedFlights = flightData.map((flight) => {
        const itinerary = flight.itineraries[0];
        const segments = itinerary?.segments || [];
        const lastSegment = segments[segments.length - 1];
      
        return {
          carrierCode: flight.validatingAirlineCodes ? flight.validatingAirlineCodes[0] : 'N/A',
          flightNumber: lastSegment?.number || 'N/A',
          origin: segments[0]?.departure?.iataCode || 'Unknown',
          destination: lastSegment?.arrival?.iataCode || 'Unknown',
          departureTime: segments[0]?.departure?.at || 'N/A',
          arrivalTime: lastSegment?.arrival?.at || 'N/A',
          duration: itinerary?.duration || 'N/A',
          price: flight.price?.total || 'N/A',
        };
      });
      
      

    return mappedFlights;
  } catch (error) {
    console.error('Error in Amadeus API request:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = fetchFlightsFromAmadeus;
