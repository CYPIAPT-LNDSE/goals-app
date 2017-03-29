import React from 'react';

const ProgressBarComponent = ({ rating, time, }) => {
  const score = parseInt(rating, 10);
  const style = {
    width: `${(score*10)}%`,
    animation: `stretchRight${score} 2s ease-out`,};
  const left = {
    left: `${(score*10)-6}%`,
    animation: `slideRight${score} 2s ease-out`,};
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-background" />
      <div className="progress-bar-foreground" style={ style } />
      <div className="progress-bar-rating" style={ left }>
        <p>{ score }</p>
      </div>
      <div className="progress-bar-time">
        <p>
          { time.toString() }
        </p>
      </div>
    </div>
  );
};

ProgressBarComponent.propTypes = {
  rating: React.PropTypes.string,
  time: React.PropTypes.string,
};

export default ProgressBarComponent;
