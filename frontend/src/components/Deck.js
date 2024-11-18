import React from 'react';
import Seat from './Seat';

const Deck = ({ deck, onSeatSelect, selectedSeats }) => {
  const { width, length, seats } = deck;

  const displaySeats = (seatList) => (
    <div>
      {seatList.map((seat, index) => {
        const isSelected = selectedSeats.some((s) => s.number === seat.number);
        return (
          <Seat
            key={index}
            number={seat.number}
            x={seat.coordinates.x}
            y={seat.coordinates.y}
            availability={seat.travelerPricing[0].seatAvailabilityStatus}
            isSelected={isSelected}
            onClick={() => onSeatSelect(seat)}
          />
        );
      })}
    </div>
  );

  return (
    <div
      id="deck"
      style={{
        width: `${width * 2.2}em`,
        height: `${length * 2.1}em`,
        position: 'relative',
        backgroundColor: '#f0f0f0',
        margin: '1em auto',
      }}
    >
      {displaySeats(seats)}
    </div>
  );
};

export default Deck;
