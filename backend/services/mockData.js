const mockFlightOrderResponse = {
    bookingId: 'MOCK12345', // Add a booking ID here
    data: {
      type: 'flight-order',
      id: 'MOCK12345',
      flightOffers: [
        {
          id: '1',
          itineraries: [
            {
              segments: [
                {
                  id: '1',
                  departure: {
                    iataCode: 'ATL',
                    at: '2024-11-20T11:54:00',
                  },
                  arrival: {
                    iataCode: 'JFK',
                    at: '2024-11-20T14:06:00',
                  },
                },
              ],
            },
          ],
          price: {
            total: '165.61',
            currency: 'EUR',
          },
        },
      ],
    },
  };
  
  module.exports = { mockFlightOrderResponse };
  