import React from 'react';

import GoalTile from '../goal-tile.jsx';

const goalsList = props => {

  const goals = props.store.goals;

  const goalsListItems = goals.map(goal => {
    return <li
      key={ goal.id }
    >
      <GoalTile
        goal={ goal }
      />
    </li>
  });

  const style = {
    background: 'url(app/public/images/goals-list/background.png)',
    backgroundPosition: 'bottom center',
    backgroundRepeat: 'no-repeat',
    height: Math.max(window.innerHeight - 90, goals.length * 108 + 115),
  };

  return (
    <div
      className="page goalsList"
      style={ style }
      >
      <div className="goalsList_buttonContainer">
        <div className="button-outer">
          <button type="button" name="button" className="goalsList_button">ADD A GOAL &nbsp;+</button>
        </div>
      </div>
      <div className="goalsList_list">
        <ul>
          { goalsListItems }
        </ul>
      </div>
    </div>
  )
};

export default goalsList;
