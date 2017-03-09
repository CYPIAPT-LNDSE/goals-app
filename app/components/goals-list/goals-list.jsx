import React from 'react';

const goalsList = () => {

  const goals = [];

  const goalsListItems = goals.map(goal => {
    return <li key={ goal.id }>{ goal.name }</li>
  });

  return (
    <div className="page goalsList">
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
