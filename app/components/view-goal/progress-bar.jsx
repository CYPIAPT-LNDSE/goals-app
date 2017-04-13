import React from 'react';
import moment from 'moment';

const ProgressBarComponent = ({ rating, time, }) => {

  const score = rating.score;
  const style = {
    width: `${(score * 10)}%`,
    animation: `stretchRight${score} 2s ease-out`,
  };
  const left = {
    left: `${(score * 10) - 6}%`,
    animation: `slideRight${score} 2s ease-out`,
  };
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-background" />
      <div className="progress-bar-foreground" style={ style } />
      <div className="progress-bar-rating" style={ left }>
        <p>{ score }</p>
      </div>
      <div className="progress-bar-time">
        <p>{ moment(time).format('LLLL') }</p>
      </div>
    </div>
  );
};

ProgressBarComponent.propTypes = {
  rating: React.PropTypes.object,
  time: React.PropTypes.string,
};

export default ProgressBarComponent;
