const mockVisualSeatMap = {
    rows: [
      { rowNumber: 1, seats: ['A', 'B', 'C', '', 'D', 'E', 'F'] },
      { rowNumber: 2, seats: ['A', 'B', 'C', '', 'D', 'E', 'F'] },
      { rowNumber: 3, seats: ['A', 'B', 'C', '', 'D', 'E', 'F'] },
      { rowNumber: 4, seats: ['A', 'B', 'C', '', 'D', 'E', 'F'] },
      { rowNumber: 5, seats: ['A', 'B', 'C', '', 'D', 'E', 'F'] },
    ],
    seatAvailability: {
      '1A': 'AVAILABLE',
      '1B': 'OCCUPIED',
      '1C': 'AVAILABLE',
      '1D': 'AVAILABLE',
      '1E': 'AVAILABLE',
      '1F': 'OCCUPIED',
      // Add availability for all seats
    },
  };
  module.exports = { mockVisualSeatMap };
  