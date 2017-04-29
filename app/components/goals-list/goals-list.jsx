import React from 'react';

import GoalTile from '../goal-tile.jsx';

import * as steps from './../../steps.js';

const GoalsList = ({ goals, stepAddGoal, onSelectGoal, }) => {

  const goalsListItems = goals.map(goal => {
    return (
      <li key={ goal.id } >
        <GoalTile
          goal={ goal }
          step={ steps.GOALS_LIST }
          onSelectGoal={ onSelectGoal }
        />
      </li>);
  });

  const dynamicStyle = {
    height: Math.max(window.innerHeight - 90, goals.length * 108 + 115),
  };

  return (
    <div className="page goals-list" style={ dynamicStyle }>
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
};

export default GoalsList;
