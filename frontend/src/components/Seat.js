const Seat = ({ number, x, y, availability, isSelected, onClick }) => {
    const color = isSelected ? '#FFD700' : availability === 'AVAILABLE' ? '#499167' : '#FE5F55';
  
    return (
      <div
        className="seat"
        style={{
          position: 'absolute',
          left: `${y * 2}em`,
          top: `${x * 2}em`,
          backgroundColor: color,
          color: 'white',
          padding: '0.5em',
          textAlign: 'center',
          cursor: availability === 'AVAILABLE' ? 'pointer' : 'not-allowed',
          border: isSelected ? '2px solid black' : 'none',
        }}
        onClick={availability === 'AVAILABLE' ? onClick : null}
      >
        {number}
      </div>
    );
  };
  
  export default Seat;
  