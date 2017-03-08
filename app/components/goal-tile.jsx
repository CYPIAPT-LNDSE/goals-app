import React from 'react';

const tile = props => {

  const goal = props.goal;

  return <div>
    <p>{ goal.name }</p>
  </div>

}

export default tile;
