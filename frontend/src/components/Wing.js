import React from 'react';

const Wing = ({ orientation, start, end }) => {
  const leftVal = orientation === 'left' ? '-252px' : '15.5em';
  const style = {
    backgroundColor: '#99B2DD',
    width: '250px',
    height: `${(end - start) * 2}em`,
    position: 'absolute',
    top: `${start * 2}em`,
    left: leftVal,
    borderRadius: '4px',
  };

  return <div className="wing" style={style}></div>;
};

export default Wing;
