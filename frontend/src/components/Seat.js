import React from 'react';

const Seat = ({ number, x, y, availability }) => {
  const color = availability === 'AVAILABLE' ? '#499167' : '#FE5F55';
  const style = {
    position: 'absolute',
    left: `${y * 2}em`,
    top: `${x * 2}em`,
    backgroundColor: color,
    color: 'white',
    width: '2em',
    height: '2em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
    cursor: availability === 'AVAILABLE' ? 'pointer' : 'not-allowed',
  };

  return (
    <div className="seat" style={style} title={availability}>
      <p>{number}</p>
    </div>
  );
};

export default Seat;
