import React from 'react';

import Avatars from './new-goal-avatars.jsx';
import NewGoalInput from './new-goal-input.jsx';
import ConfirmationModal from './confirmation.jsx';

const addGoal = ({ newGoal, onInputGoal, onSelectAvatar, saveNewGoal, triggerConfirmation, }) => {

  const modal = newGoal.confirmation
    ? <ConfirmationModal />
    : '';

  return (
    <div className="addNewGoal">
      { modal }
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
      <Avatars
        onSelectAvatar={ onSelectAvatar }
        newGoal={ newGoal }
      />
      <div className="newGoal_buttonContainer">
        <div className="button-outer">
          <button
            type="button"
            name="button"
            className="newGoal_button"
            disabled={ !newGoal.name }
            onClick={ triggerConfirmation }
          >ADD</button>
        </div>
      </div>
    </div>
  );
};

addGoal.propTypes = {
  newGoal: React.PropTypes.object,
  onInputGoal: React.PropTypes.func,
  onSelectAvatar: React.PropTypes.func,
  saveNewGoal: React.PropTypes.func,
  newGoalId: React.PropTypes.number,
  triggerConfirmation: React.PropTypes.func,
};

export default addGoal;
