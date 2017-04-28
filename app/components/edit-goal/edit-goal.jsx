import React from 'react';

import * as steps from './../../steps.js';
import GoalTile from '../goal-tile.jsx';
import NewGoalInput from '../add-new-goal/new-goal-input.jsx';

const editGoal = ({ goal, newGoal, onInputGoal, onSaveEditGoal, }) => {

  return (
    <div className="editGoal">
      <GoalTile
        goal={ goal }
        step={ steps.EDIT_GOAL }
        />
      <div className="editGoal_inputContainer-outer">
        <label htmlFor="editGoalInput" className="editGoal_label">
          Change your goal's title
        </label>
      <NewGoalInput newGoal={ newGoal } onInputGoal={ onInputGoal } />
      </div>
      <div className="editGoal_buttonContainer">
        <div className="button-outer">
          <button
            type="button"
            name="button"
            className="editGoal_button"
            disabled={ !goal.name }
            onClick={ () => { onSaveEditGoal(goal); }}
          >SAVE</button>
        </div>
      </div>
    </div>
  );
};

editGoal.propTypes = {
  goal: React.PropTypes.object,
  newGoal: React.PropTypes.object,
  onInputGoal: React.PropTypes.func,
  onSaveEditGoal: React.PropTypes.func,
};

export default editGoal;
