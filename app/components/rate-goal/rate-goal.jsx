import React from 'react';
import GoalTileComponent from '../goal-tile.jsx';
import RateGoalSlider from './rate-goal-slider.jsx';

const RateGoal = ({ currentGoal, onMoveSlider, }) => {
  return (
    <div className="rate-goal goal-detail-page">
      <div className="goal-detail-goal-tile-container">
        <GoalTileComponent goal={ currentGoal } />
      </div>
      {/* container with animation */}
      {/* slider */}
      <div className="rate-goal-slider-container">
        <RateGoalSlider
          goal={ currentGoal }
          onMoveSlider={ onMoveSlider }
        />
      </div>}
      {/* button - transition to comments page */}
    </div>
  );
}

export default RateGoal;
