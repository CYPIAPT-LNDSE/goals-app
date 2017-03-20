import React from 'react';
import GoalTileComponent from '../goal-tile.jsx';

const RateGoal = ({ currentGoal, }) => {
  return (
    <div className="rate-goal goal-detail-page">
      <div className="goal-detail-goal-tile-container">
        <GoalTileComponent goal={ currentGoal } />
      </div>
      {/* container with animation */}
      {/* slider */}
      {/* button - transition to comments page */}
    </div>
  );
}

export default RateGoal;
