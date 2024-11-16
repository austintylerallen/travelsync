import React from 'react';

const Facility = ({ code, x, y }) => {
  const left = `${y * 2}em`;
  const top = `${x * 2}em`;
  const style = {
    position: 'absolute',
    left,
    top,
    backgroundColor: '#F5EE9E',
    color: '#333',
    padding: '0.5em',
    borderRadius: '4px',
    textAlign: 'center',
    fontSize: '0.8em',
  };

  return (
    <div className="facility" style={style}>
      <p>{code}</p>
    </div>
  );
};

export default Facility;
