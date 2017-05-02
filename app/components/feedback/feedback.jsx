import React from 'react';

import GoalTileComponent from '../goal-tile.jsx';
import FeedbackInput from './feedback-input.jsx';

import * as steps from './../../steps.js';

const Feedback = ({ currentGoal, onInputFeedback, saveRating, screenHeight, dynamicStyle, }) => {
  return (
    <div className='feedback-page' style={ dynamicStyle }>
      <div className='feedback-goal-tile-container'>
        <GoalTileComponent goal={ currentGoal } step={ steps.FEEDBACK }/>
      </div>
      <div className='feedback-question-container'>
        <p>Would you like to explain why?</p>
      </div>
      <FeedbackInput
        onInputFeedback= { onInputFeedback }
        comment= { currentGoal.newRating.comment }
        screenHeight={ screenHeight }
      />
    <div className='feedback-button-container goal-detail-button-container'>
        <div className='button-outer'>
          <button
            type='button'
            name='button'
            className='new-feedback-button'
            onClick = { () => { saveRating(); } }
          >Save</button>
      </div>
    </div>
  </div>
  );
};

Feedback.propTypes = {
  currentGoal: React.PropTypes.object,
  onInputFeedback: React.PropTypes.func,
  saveRating: React.PropTypes.func,
  screenHeight: React.PropTypes.number,
  dynamicStyle: React.PropTypes.object,
};

export default Feedback;
