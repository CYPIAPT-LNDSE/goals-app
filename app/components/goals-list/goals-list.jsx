import React from 'react';

const goalsList = props => {

  const style = {
    background: 'url(app/public/images/goals-list/background.png)',
    backgroundPosition: 'bottom center',
    backgroundRepeat: 'no-repeat',
  };


  return (
    <div
      className="page goalsList"
      style={style}
    >
    <div className="goalsList_buttonContainer">
      <div className="button-outer">
        <button type="button" name="button" class="add-goal-button">ADD A GOAL &nbsp;+</button>
      </div>
    </div>

    </div>
  )
};

export default goalsList;
