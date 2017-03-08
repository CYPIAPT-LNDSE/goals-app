import React from 'react';

const goalsList = props => {

  const style = {
    background: 'url(app/public/images/goals-list/background.png)',
    backgroundPosition: 'bottom center',
  };


  return (
    <div
      className="page goalsList"
      style={style}
    >
      Hello goals
    </div>
  )
};

export default goalsList;
