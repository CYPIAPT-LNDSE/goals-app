import React from 'react';

import NewGoalInput from '../add-new-goal/new-goal-input.jsx';

const editGoal = ({ goal, onInputGoal, onSaveEditGoal, }) => {

  return (
    <div className="editGoal">
      <div className="editGoal_inputContainer-outer">
        <label htmlFor="editGoalInput" className="editGoal_label">
          Set a goal and choose a plant to grow with it
        </label>
      <NewGoalInput newGoal={ goal } onInputGoal={ onInputGoal } />
      </div>
      <div className="editGoal_buttonContainer">
        <div className="button-outer">
          <button
            type="button"
            name="button"
            className="editGoal_button"
            disabled={ !goal.name }
            onClick={ onSaveEditGoal }
          >ADD</button>
        </div>
      </div>
    </div>
  );
};

editGoal.propTypes = {
  goal: React.PropTypes.object,
  onInputGoal: React.PropTypes.func,
  onSaveEditGoal: React.PropTypes.func,
};

export default editGoal;
