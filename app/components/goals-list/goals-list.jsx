import React from 'react';

import GoalTile from '../goal-tile.jsx';

const goalsList = ({goals}) => {

  const goalsListItems = goals.map(goal => {
    return <li key={ goal.id } >
      <GoalTile goal={ goal } />
    </li>
  });

  const dynamicStyle = {
    height: Math.max(window.innerHeight - 90, goals.length * 108 + 115),
  };

  return (
    <div className="page goalsList" style={ dynamicStyle }>
      <div className="goalsList_buttonContainer">
        <div className="button-outer">
          <button type="button" name="button" className="goalsList_button">
            ADD A GOAL &nbsp;+
          </button>
        </div>
      </div>
      <div className="goalsList_list">
        <ul>
          { goalsListItems }
        </ul>
      </div>
    </div>
  );
};

export default goalsList;
