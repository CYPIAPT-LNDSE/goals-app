import React from 'react';

const ProgressBarComponent = ({ rating, time }) => {
  return (
    <div>
      <div className="progress-bar-background">

      </div>
      <div className="progress-bar-forground">

      </div>
      <div className="progress-bar-rating">
        {rating}
      </div>
      // time
      <div className="progress-bar-time">
        <p>
          {time}
        </p>
      </div>
    </div>
  );
}

export default ProgressBarComponent;
