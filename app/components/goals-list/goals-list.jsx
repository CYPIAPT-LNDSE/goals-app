import React from 'react';
import PropTypes from 'prop-types';

/* components */
import GoalTile from '../goal-tile.jsx';
import DeleteModal from './delete-modal.jsx';

import * as steps from './../../steps.js';

const GoalsList = ({ goals, stepAddGoal, onSelectGoal,
  onBorderClick, onDeleteGoal, onEditGoal, deleteModal, toggleDeleteModal, }) => {

  const goalsListItems = goals.map(goal => {
    return (
      <li key={ goal.id } >
        <GoalTile
          goal={ goal }
          step={ steps.GOALS_LIST }
          onSelectGoal={ onSelectGoal }
          visibleEditDelete={ goal.visibleEditDelete }
          onBorderClick={ onBorderClick }
          onDeleteGoal={ onDeleteGoal }
          onEditGoal={ onEditGoal }
          toggleDeleteModal={ toggleDeleteModal }
        />
      </li>);
  });

  const dynamicStyle = {
    height: Math.max(window.innerHeight - 90, goals.length * 108 + 115),
  };

  const overlay = deleteModal.display
    ? <DeleteModal
        toggleDeleteModal={ toggleDeleteModal }
        deleteModal={ deleteModal }
        onDeleteGoal={ onDeleteGoal }
      />
    : null;

  return (
    <div className="page goalsList" style={ dynamicStyle }>
      { overlay }
      <div className="goalsList_buttonContainer">
        <div className="button-outer">
          <button
            type="button"
            name="button"
            className="goalsList_button"
            onClick={ stepAddGoal }
          >ADD A GOAL &nbsp;+</button>
        </div>
      </div>
      <div className="goalsList_list">
        <ul>{ goalsListItems }</ul>
      </div>
    </div>
  );
};

GoalsList.propTypes = {
  goals: PropTypes.array,
  stepAddGoal: PropTypes.func,
  onSelectGoal: PropTypes.func,
  visibleEditDelete: PropTypes.bool,
  onBorderClick: PropTypes.func,
  onDeleteGoal: PropTypes.func,
  onEditGoal: PropTypes.func,
  toggleDeleteModal: PropTypes.func,
  deleteModal: PropTypes.object,
};

export default GoalsList;
