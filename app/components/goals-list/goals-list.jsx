import React from 'react';

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
    <div className="page goalsList" style={ dynamicStyle }>
      { loading }
      { overlay }
      <div className="goalsList_buttonContainer">
        <div className="button-outer">
          <button
            type="button"
            name="button"
            className="goalsList_button"
            onClick={ props.stepAddGoal }
          >ADD A GOAL &nbsp;+</button>
        </div>
      </div>
      <div className="goalsList_list">
        <ul>{ goalsListItems }</ul>
      </div>
    </div>
  );
};

createGoalListItem.propTypes = {
  onSelectGoal: React.PropTypes.func,
  visibleEditDelete: React.PropTypes.bool,
  onBorderClick: React.PropTypes.func,
  onDeleteGoal: React.PropTypes.func,
  onEditGoal: React.PropTypes.func,
  toggleDeleteModal: React.PropTypes.func,
};

GoalsList.propTypes = {
  goals: React.PropTypes.array,
  stepAddGoal: React.PropTypes.func,
  toggleDeleteModal: React.PropTypes.func,
  onDeleteGoal: React.PropTypes.func,
  deleteModal: React.PropTypes.object,
  dataLoaded: React.PropTypes.boolean,
};

export default GoalsList;
