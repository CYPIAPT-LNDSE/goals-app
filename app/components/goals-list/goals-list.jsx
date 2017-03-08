import React from 'react';

const goalsList = props => {

  const goals = props.store.goals;

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
        <button type="button" name="button" className="goalsList_button">ADD A GOAL &nbsp;+</button>
      </div>
    </div>
    <div className="goalsList_list">
      <ul>
        <li>{ goals[0].name }</li>

      </ul>
    </div>

    </div>
  )
};

export default goalsList;
