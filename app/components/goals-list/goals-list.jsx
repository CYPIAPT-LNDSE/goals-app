import React from 'react';

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
    <div className="page goals-list" style={ dynamicStyle }>
      { overlay }
      <div className="goals-list-button-container">
        <div className="button-outer">
          <button
            type="button"
            name="button"
            className="goals-list-button"
            onClick={ stepAddGoal }
          >ADD A GOAL &nbsp;+</button>
        </div>
      </div>
      <div className="goals-list-list">
        <ul>{ goalsListItems }</ul>
      </div>
    </div>
  );
};

GoalsList.propTypes = {
  goals: React.PropTypes.array,
  stepAddGoal: React.PropTypes.func,
  onSelectGoal: React.PropTypes.func,
  visibleEditDelete: React.PropTypes.bool,
  onBorderClick: React.PropTypes.func,
  onDeleteGoal: React.PropTypes.func,
  onEditGoal: React.PropTypes.func,
  toggleDeleteModal: React.PropTypes.func,
  deleteModal: React.PropTypes.object,
};

export default GoalsList;
