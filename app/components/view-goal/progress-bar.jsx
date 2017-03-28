import React from 'react';

const ProgressBarComponent = ({ progress, time, }) => {
  const style = {
    width: `${(progress*10)}%`,
    animation: `stretchRight${progress} 2s ease-out`,};
  const left = {
    left: `${(progress*10)-6}%`,
    animation: `slideRight${progress} 2s ease-out`,};
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-background" />
      <div className="progress-bar-foreground" style={style} />
      <div className="progress-bar-rating" style={left}>
        <p>{progress}</p>
      </div>
      <div className="progress-bar-time">
        <p>
          {time}
        </p>
      </div>
    </div>
  );
};

export default ProgressBarComponent;
