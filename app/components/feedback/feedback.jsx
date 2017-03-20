import React from 'react';
import GoalTileComponent from '../goal-tile.jsx';
const Feedback = ({ currentGoal }) => {
  return (
    <div className='feedback-page'>
      <div className='feedback-goal-tile-container'>
        <GoalTileComponent goal={ currentGoal } />
      </div>
      <div className='feedback-question-container'>
        <p>Would you like to explain why?</p>
      </div>
    </div>
  );
};

export default Feedback;
