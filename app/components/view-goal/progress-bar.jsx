import React from 'react';
import moment from 'moment';

const ProgressBarComponent = ({ rating, }) => {
  const score = parseInt(rating.score) || 0;
  const style = {
    width: `${(score * 10)}%`,
    animation: `stretchRight${score} 2s ease-out`
  };
  const left = {
    left: `${(score * 10) - (score > 0 ? 6 : 0)}%`,
    animation: `slideRight${score} 2s ease-out`};
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-background" />
      <div className="progress-bar-foreground" style={style} />
      <div className="progress-bar-rating" style={left}>
        <p>{ (score || 0) }</p>
      </div>
      <div className="progress-bar-time">
        <p>
          { moment().format("ddd, hA") }
        </p>
      </div>
    </div>
  );
}

export default ProgressBarComponent;
