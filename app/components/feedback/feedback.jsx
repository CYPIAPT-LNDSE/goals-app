import React from 'react';

import GoalTileComponent from '../goal-tile.jsx';
import FeedbackInput from './feedback-input.jsx';

import * as steps from './../../steps.js';

const Feedback = ({ currentGoal, onInputFeedback, saveRating, }) => {
  return (
    <div className='feedback-page'>
      <div className='feedback-goal-tile-container'>
        <GoalTileComponent goal={ currentGoal } step={ steps.FEEDBACK }/>
      </div>
      <div className='feedback-question-container'>
        <p>Would you like to explain why?</p>
      </div>
      <FeedbackInput
        onInputFeedback= { onInputFeedback }
        comment= { currentGoal.newRating.comment }
      />
    <div className='feedback-button-container goal-detail-button-container'>
        <div className='button-outer'>
          <button
            type='button'
            name='button'
            className='new-feedback-button'
            onClick = { () => { saveRating(new Date(), Math.random() * 100); } }
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
};

export default Feedback;
