import React from 'react';

const addGoal = () => {
  return (
    <div className="addNewGoal">
      <div className="newGoal_inputContainer-outer">
        <label
          htmlFor="newGoalInput"
          className="newGoal_label"
        >Pick a plant to grow alongside your goal</label>
        <div className="newGoal_inputContainer-inner">
          <textarea
            name="new-goal"
            id="newGoalInput"
            maxLength="50"
            className="newGoal_input"
            type="text"
            autoFocus
          />
        </div>
      </div>
    </div>
  )
}

export default addGoal;
