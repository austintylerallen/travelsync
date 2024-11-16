import React from 'react';
import Seat from './Seat';
import Exit from './Exit';
import Facility from './Facility';
import Wing from './Wing';

const Deck = ({ deck }) => {
  const displaySeats = (seats) => (
    <div>
      {seats.map((seat) => (
        <Seat
          key={seat.number}
          number={seat.number}
          x={seat.coordinates.x}
          y={seat.coordinates.y}
          availability={seat.travelerPricing[0]?.seatAvailabilityStatus}
        />
      ))}
    </div>
  );

  const displayExits = (exitRows) => (
    <div>{exitRows.map((row, i) => <Exit key={i} row={row} />)}</div>
  );

  const displayFacilities = (facilities) => (
    <div>
      {facilities.map((facility, i) => (
        <Facility key={i} code={facility.code} x={facility.coordinates.x} y={facility.coordinates.y} />
      ))}
    </div>
  );

  const displayWings = (start, end) => (
    <>
      <Wing orientation="left" start={start} end={end} />
      <Wing orientation="right" start={start} end={end} />
    </>
  );

  return (
    <div
      id="deck"
      style={{
        width: `${deck.deckConfiguration.width * 2.2}em`,
        height: `${deck.deckConfiguration.length * 2.1}em`,
      }}
    >
      {displayWings(deck.deckConfiguration.startWingsX, deck.deckConfiguration.endWingsX)}
      {displaySeats(deck.seats)}
      {displayFacilities(deck.facilities)}
      {displayExits(deck.deckConfiguration.exitRowsX)}
    </div>
  );
};

export default Deck;
