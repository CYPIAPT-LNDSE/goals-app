import React from 'react';
import PropTypes from 'prop-types';

/* components */
import NewGoalInput from './new-goal-input.jsx';
import ConfirmationModal from './confirmation.jsx';

import Avatars from './new-goal-avatars.jsx';

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
  newGoal: PropTypes.object,
  onInputGoal: PropTypes.func,
  onSelectAvatar: PropTypes.func,
  saveNewGoal: PropTypes.func,
  triggerConfirmation: PropTypes.func,
  screenHeight: PropTypes.number,
  dynamicStyle: PropTypes.object,
};

export default addGoal;
