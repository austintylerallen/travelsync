import React from 'react';

const Exit = ({ row }) => {
  const styleLeft = {
    position: 'absolute',
    left: '-4.1em',
    top: `${row * 2}em`,
    backgroundColor: '#499167',
    color: 'white',
    padding: '0.5em',
    borderRadius: '4px',
  };

  const styleRight = {
    position: 'absolute',
    left: '13.5em',
    top: `${row * 2}em`,
    backgroundColor: '#499167',
    color: 'white',
    padding: '0.5em',
    borderRadius: '4px',
  };

  return (
    <div className="exit">
      <span style={styleLeft}>EXIT</span>
      <span style={styleRight}>EXIT</span>
    </div>
  );
};

export default Exit;
