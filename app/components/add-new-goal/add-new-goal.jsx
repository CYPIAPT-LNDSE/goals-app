import React from 'react';

import Avatars from './new-goal-avatars.jsx';

const addGoal = () => {

  return (
    <div className="addNewGoal">
      <div className="newGoal_inputContainer-outer">
        <label
          htmlFor="newGoalInput"
          className="newGoal_label"
        >Set a goal and choose a plant to grow with it</label>
        <div className="newGoal_inputContainer-inner">
          <textarea
            name="new-goal"
            id="newGoalInput"
            maxLength="50"
            placeholder="My goal is..."
            className="newGoal_input"
            type="text"
            autoFocus
          />
        </div>
      </div>
      <Avatars />

    </div>
  )
}

export default addGoal;
