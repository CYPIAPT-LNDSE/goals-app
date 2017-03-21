import React from 'react';
import GoalTileComponent from '../goal-tile.jsx';
import RateGoalSlider from './rate-goal-slider.jsx';

import Cactus from './animations/cactus.jsx';

const RateGoal = ({ currentGoal, onMoveSlider, feedback }) => {

  const animation = <Cactus />;

  return (
    <div className="rate-goal goal-detail-page">
      <div className="goal-detail-goal-tile-container">
        <GoalTileComponent goal={ currentGoal } />
      </div>
      <div className="rate-goal-animation-container">
        <p>Rate your latest progress out of 10</p>
          { animation }
        <div className="animation-container-rating">
          <div className="rating-bubble">
            <p>{ (currentGoal.newRating.score || 0) }</p>
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
            onClick={ () => feedback() }
          >Rate</button>
        </div>
      </div>
    </div>
  );
}

export default RateGoal;
