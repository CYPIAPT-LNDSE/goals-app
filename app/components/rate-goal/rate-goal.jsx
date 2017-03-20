import React from 'react';
import GoalTileComponent from '../goal-tile.jsx';

const RateGoal = ({ currentGoal, feedback }) => {
  return (
    <div className="rate-goal goal-detail-page">
      <div className="goal-detail-goal-tile-container">
        <GoalTileComponent goal={ currentGoal } />
      </div>
      <div className="view-goal-buttonContainer">
        <div className="button-outer">
          <button
            type="button"
            name="button"
            className="new-rating-button"
            onClick={ () => feedback(currentGoal) }
          >Rate</button>
        </div>
      </div>
    </div>
  );
}

export default RateGoal;
