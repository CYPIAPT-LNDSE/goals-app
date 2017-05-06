import React from 'react';
import PropTypes from 'prop-types';

/* components */
import GoalTile from '../goal-tile.jsx';
import DeleteModal from './delete-modal.jsx';
import LoadingModal from './../loading-modal.jsx';

import * as steps from './../../steps.js';

const createGoalListItem = (goal, props) => (
  <li key={ goal.id } >
    <GoalTile
      goal={ goal }
      step={ steps.GOALS_LIST }
      onSelectGoal={ props.onSelectGoal }
      visibleEditDelete={ goal.visibleEditDelete }
      onBorderClick={ props.onBorderClick }
      onDeleteGoal={ props.onDeleteGoal }
      onEditGoal={ props.onEditGoal }
      toggleDeleteModal={ props.toggleDeleteModal }
    />
  </li>
);

const GoalsList = props => {

  const goals = props.goals;

  const goalsListItems = goals.map(goal => createGoalListItem(goal, props));

  const dynamicStyle = {
    height: Math.max(window.innerHeight - 90, goals.length * 108 + 115),
  };

  const loading = !props.dataLoaded
    ? <LoadingModal />
    : null;

  const overlay = props.deleteModal.display
    ? <DeleteModal
        toggleDeleteModal={ props.toggleDeleteModal }
        deleteModal={ props.deleteModal }
        onDeleteGoal={ props.onDeleteGoal }
      />
    : null;

  return (
    <div className="page goals-list" style={ dynamicStyle }>
      { loading }
      { overlay }
      <div className="goals-list-button-container">
        <div className="button-outer">
          <button
            type="button"
            name="button"
            className="goals-list-button"
            onClick={ props.stepAddGoal }
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

createGoalListItem.propTypes = {
  onSelectGoal: PropTypes.func,
  visibleEditDelete: PropTypes.bool,
  onBorderClick: PropTypes.func,
  onDeleteGoal: PropTypes.func,
  onEditGoal: PropTypes.func,
  toggleDeleteModal: PropTypes.func,
};

GoalsList.propTypes = {
  goals: PropTypes.array,
  stepAddGoal: PropTypes.func,
  toggleDeleteModal: PropTypes.func,
  onDeleteGoal: PropTypes.func,
  deleteModal: PropTypes.object,
  dataLoaded: PropTypes.boolean,
};

export default GoalsList;
