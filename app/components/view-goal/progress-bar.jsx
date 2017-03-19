import React from 'react';

const ProgressBarComponent = ({ rating, time }) => {
  const style = {
    width: `${(rating*10)}%`,
    animation: `stretchRight${rating} 2s ease-out`};
  const left = {
    left: `${(rating*10)-6}%`,
    animation: `slideRight${rating} 2s ease-out`};
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-background" />
      <div className="progress-bar-foreground" style={style} />
      <div className="progress-bar-rating" style={left}>
        <p>{rating}</p>
      </div>
      <div className="progress-bar-time">
        <p>
          {time}
        </p>
      </div>
    </div>
  );
}

export default ProgressBarComponent;
