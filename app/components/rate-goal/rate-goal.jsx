import React from 'react';
import GoalTileComponent from '../goal-tile.jsx';
import RateGoalSlider from './rate-goal-slider.jsx';

const RateGoal = ({ currentGoal, onMoveSlider, }) => {
  return (
    <div className="rate-goal goal-detail-page">
      <div className="goal-detail-goal-tile-container">
        <GoalTileComponent goal={ currentGoal } />
      </div>
      <div className="rate-goal-animation-container">
        <p>Rate your latest progress out of 10</p>
        <div className="animation-container-rating">
          <div className="rating-bubble">
            <p>{ (currentGoal.newRating || 0) }</p>
          </div>
        </div>
      </div>
      <div className="rate-goal-slider-container">
        <RateGoalSlider
          goal={ currentGoal }
          onMoveSlider={ onMoveSlider }
          />
      </div>
      <div className="rate-goal-buttonContainer goal-detail-buttonContainer">
        <div className="button-outer">
          <button
            type="button"
            name="button"
            className="new-rating-button"
            >Rate</button>
        </div>
      </div>
    </div>
  );
}

export default RateGoal;
