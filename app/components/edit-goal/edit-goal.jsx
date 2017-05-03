import React from 'react';

import * as steps from './../../steps.js';
import GoalTile from '../goal-tile.jsx';
import EditGoalInput from './edit-goal-input.jsx';

const editGoal = ({ goal, newGoal, onInputEditGoal, onSaveEditGoal, }) => {

  return (
    <div className="edit-goal">
      <GoalTile
        goal={ goal }
        step={ steps.EDIT_GOAL }
        />
      <div className="edit-goal-input-container-outer">
        <label htmlFor="editGoalInput" className="edit-goal-label">
          Change your goal's title
        </label>
      <EditGoalInput newGoal={ goal } onInputEditGoal={ onInputEditGoal } />
      </div>
      <div className="edit-goal-button-container">
        <div className="button-outer">
          <button
            type="button"
            name="button"
            className="edit-goal-button"
            disabled={ !goal.name }
            value={ newGoal.name }
            onClick={ onSaveEditGoal }
          >SAVE</button>
        </div>
      </div>
    </div>
  );
};

editGoal.propTypes = {
  goal: React.PropTypes.object,
  newGoal: React.PropTypes.object,
  onInputEditGoal: React.PropTypes.func,
  onSaveEditGoal: React.PropTypes.func,
};

export default editGoal;
