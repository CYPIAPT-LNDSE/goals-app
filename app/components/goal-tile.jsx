import React from 'react';

import * as steps from './../steps.js';

const tile = props => {

  const goal = props.goal;
  const pathAvatar = `./images/avatars/${goal.avatar}.svg`;

  return (
    <div
      className="goalTile"
      onClick={ () => {
        if (props.step === steps.GOALS_LIST) {
          props.onSelectGoal(goal);
        }
      }}
    >{/* outer div for goal tile */}
      <div className="goalTile_progress"> {/* green background showing progress */}
      </div>
      <div className="goalTile_avatarContainer">
        <img className="goalTile_img" src={ pathAvatar } />
      </div>
      <div className="goalTile_nameContainer">
        <p>{ goal.name }</p>
      </div>
      <div className="goalTile_rating">
        <p>{ goal.currentRating }</p>
      </div>
    </div>
  );
};

tile.propTypes = {
  goal: React.PropTypes.object,
  step: React.PropTypes.string,
};

export default tile;
