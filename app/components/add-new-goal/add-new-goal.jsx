import React from 'react';

import Avatars from './new-goal-avatars.jsx';
import NewGoalInput from './new-goal-input.jsx';

const addGoal = ({ newGoal, onInputGoal, onSelectAvatar, saveNewGoal, newGoalId, }) => {

  const goal = {
    ...newGoal, id: newGoalId,
  };

  return (
    <div className="addNewGoal">
      <div className="newGoal_inputContainer-outer">
        <label
          htmlFor="newGoalInput"
          className="newGoal_label"
        >Set a goal and choose a plant to grow with it</label>
      <NewGoalInput
        newGoal={ newGoal }
        onInputGoal={ onInputGoal }
      />
      </div>
      <Avatars onSelectAvatar={ onSelectAvatar }/>
      <div className="newGoal_buttonContainer">
        <div className="button-outer">
          <button
            type="button"
            name="button"
            className="newGoal_button"
            onClick={ () => saveNewGoal(goal) }
          >ADD</button>
        </div>
      </div>
    </div>
  )
}

export default addGoal;
