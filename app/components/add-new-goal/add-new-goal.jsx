import React from 'react';

import Avatars from './new-goal-avatars.jsx';
import NewGoalInput from './new-goal-input.jsx';
import ConfirmationModal from './confirmation.jsx';

const addGoal = ({ newGoal, onInputGoal, onSelectAvatar, saveNewGoal, triggerConfirmation, screenHeight, dynamicStyle, }) => {

  const modal = newGoal.confirmation
    ? <ConfirmationModal
        triggerConfirmation={ triggerConfirmation }
        saveGoal={ () => { saveNewGoal(newGoal); } }
    />
    : null;

  return (
    <div className="add-new-goal">
      { modal }
      <div className="new-goal-input-container-outer">
        <label htmlFor="newGoalInput" className="new-goal-label">
          Set a goal and choose a plant to grow with it
        </label>
        <NewGoalInput
          newGoal={ newGoal }
          onInputGoal={ onInputGoal }
          screenHeight={ screenHeight }
        />
      </div>
      <Avatars
        onSelectAvatar={ onSelectAvatar }
        newGoal={ newGoal }
      />
    <div className="new-goal-button-container">
        <div className="button-outer">
          <button
            type="button"
            name="button"
            className="new-goal-button"
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
  triggerConfirmation: React.PropTypes.func,
  screenHeight: React.PropTypes.number,
  dynamicStyle: React.PropTypes.object,
};

export default addGoal;
