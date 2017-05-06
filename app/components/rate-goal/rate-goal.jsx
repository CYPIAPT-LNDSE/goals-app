import React from 'react';
import PropTypes from 'prop-types';

/* components */
import GoalTileComponent from '../goal-tile.jsx';
import RateGoalSlider from './rate-goal-slider.jsx';

import * as steps from './../../steps.js';

import Cactus from './animations/cactus.jsx';

const RateGoal = ({ currentGoal, onMoveSlider, feedback, setPreviousScore, dynamicStyle, }) => {

  const score = currentGoal.newRating.score || 0;

  const animation = <Cactus
    score={ score }
    previousScore={ currentGoal.newRating.previousScore || 0 }
    setPreviousScore={ setPreviousScore }
  />;

  return (
    <div className="rate-goal goal-detail-page" style={ dynamicStyle }>
      <div className="goal-detail-goal-tile-container">
        <GoalTileComponent
          goal={ currentGoal }
          step={ steps.RATE_GOAL }
        />
      </div>
      <div className="rate-goal-animation-container">
        <p>Rate your latest progress out of 10</p>
          { animation }
      </div>
      <div className="rate-goal-slider-container">
        <RateGoalSlider
          goal={ currentGoal }
          onMoveSlider={ onMoveSlider }
          />
      </div>
      <div className="rate-goal-button-container goal-detail-button-container">
        <div className="button-outer">
          <button
            type="button"
            name="button"
            className="new-rating-button"
            onClick={ feedback }
            disabled={ score < 1 }
          >Rate</button>
        </div>
      </div>
    </div>
  );
};

RateGoal.propTypes = {
  currentGoal: PropTypes.object,
  onMoveSlider: PropTypes.func,
  feedback: PropTypes.func,
  setPreviousScore: PropTypes.func,
  dynamicStyle: PropTypes.object,
};

export default RateGoal;
