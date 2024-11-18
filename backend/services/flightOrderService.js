// const axios = require('axios');

// const AMADEUS_API_URL = 'https://test.api.amadeus.com';

// // Function to create a flight order
// const createFlightOrder = async (flightOffer, passengers) => {
//   try {
//     console.log('Received flightOffer:', flightOffer);
//     console.log('Received passengers:', passengers);

//     const formattedFlightOffer = {
//       id: '1',
//       type: 'flight-offer',
//       validatingAirlineCodes: [flightOffer.carrierCode],
//       source: 'GDS',
//       itineraries: [
//         {
//           segments: [
//             {
//               id: '1',
//               departure: {
//                 iataCode: flightOffer.origin,
//                 at: flightOffer.departureTime,
//               },
//               arrival: {
//                 iataCode: flightOffer.destination,
//                 at: flightOffer.arrivalTime,
//               },
//               carrierCode: flightOffer.carrierCode,
//               number: flightOffer.flightNumber,
//               duration: flightOffer.duration,
//             },
//           ],
//         },
//       ],
//       price: {
//         total: flightOffer.price.total,
//         base: flightOffer.price.base,
//         currency: flightOffer.price.currency,
//       },
//       travelerPricings: passengers.map((passenger, index) => ({
//         travelerId: `${index + 1}`,
//         travelerType: 'ADULT',
//         price: {
//           total: flightOffer.price.total,
//           currency: flightOffer.price.currency,
//         },
//         fareDetailsBySegment: [
//           {
//             segmentId: '1',
//             cabin: 'ECONOMY',
//             fareBasis: 'Y',
//             fareOption: 'STANDARD',
//           },
//         ],
//       })),
//     };

//     console.log('Formatted flightOffer:', JSON.stringify(formattedFlightOffer, null, 2));

//     const response = await axios.post(
//       `${AMADEUS_API_URL}/v1/booking/flight-orders`,
//       {
//         data: {
//           type: 'flight-order',
//           flightOffers: [formattedFlightOffer],
//           travelers: passengers.map((passenger, index) => ({
//             id: `${index + 1}`,
//             dateOfBirth: passenger.dob,
//             name: {
//               firstName: passenger.fullName.split(' ')[0],
//               lastName: passenger.fullName.split(' ')[1] || 'LastName',
//             },
//             gender: passenger.gender.toUpperCase(),
//             contact: {
//               emailAddress: passenger.email,
//               phones: [
//                 {
//                   deviceType: 'MOBILE',
//                   number: passenger.phone,
//                 },
//               ],
//             },
//           })),
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer 3gBRHZA8aJ1K9CX3Vrk5w8zuN6L8`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     console.log('Amadeus API Response:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating flight order:', error.response?.data || error.message);
//     throw error;
//   }
// };

// module.exports = { createFlightOrder };


const axios = require('axios');
const { getAmadeusAccessToken } = require('./seatMapService');
const { mockFlightOrderResponse } = require('../services/mockData');

const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true';
const AMADEUS_API_URL = 'https://test.api.amadeus.com';

const createFlightOrder = async (flightOffer, passengers) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for flight order.');
        return mockFlightOrderResponse;
      }
  
      const token = await getAmadeusAccessToken();
      const response = await axios.post(`${AMADEUS_API_URL}/v1/booking/flight-orders`, {
        data: {
          type: 'flight-order',
          flightOffers: [formattedFlightOffer],
          travelers: passengers.map((passenger, index) => ({
            id: `${index + 1}`,
            dateOfBirth: passenger.dob,
            name: { firstName: passenger.fullName.split(' ')[0], lastName: passenger.fullName.split(' ')[1] || 'LastName' },
            gender: passenger.gender.toUpperCase(),
            contact: { emailAddress: passenger.email, phones: [{ deviceType: 'MOBILE', number: passenger.phone }] },
          })),
        },
      }, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
  
      console.log('Amadeus API Response:', response.data);
      if (!response.data.id) throw new Error('Flight order response missing ID');
      return response.data;
    } catch (error) {
      console.error('Error creating flight order:', error.response?.data || error.message);
      throw error;
    }
  };
  

module.exports = { createFlightOrder };
