import React from 'react';
import GoalTileComponent from '../goal-tile.jsx';
import FeedbackInput from './feedback-input.jsx';

const Feedback = ({ currentGoal, onInputFeedback }) => (
  <div className='feedback-page'>
    <div className='feedback-goal-tile-container'>
      <GoalTileComponent goal={ currentGoal } />
    </div>
    <div className='feedback-question-container'>
      <p>Would you like to explain why?</p>
    </div>
    <FeedbackInput
      onInputFeedback= {onInputFeedback}
      comment= {currentGoal.newRating.comment}
      />
    <div className="feedback-buttonContainer goal-detail-buttonContainer">
      <div className="button-outer">
        <button
          type="button"
          name="button"
          className="new-feedback-button"
          >Save</button>
      </div>
    </div>
  </div>
);

export default Feedback;
