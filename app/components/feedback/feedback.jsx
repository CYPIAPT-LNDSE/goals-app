import React from 'react';
import GoalTileComponent from '../goal-tile.jsx';
import FeedbackInput from './feedback-input.jsx';

const Feedback = ({ currentGoal }) => {
  return (
    <div className='feedback-page'>
      <div className='feedback-goal-tile-container'>
        <GoalTileComponent goal={ currentGoal } />
      </div>
      <div className='feedback-question-container'>
        <p>Would you like to explain why?</p>
      </div>
      <FeedbackInput
        onInputFeedback= {onInputFeedback}
        comment= {comment}
        />
    </div>
  );
};

export default Feedback;
