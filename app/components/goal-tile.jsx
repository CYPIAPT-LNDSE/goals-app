import React from 'react';

import * as steps from './../steps.js';

const tile = props => {

  const goal = props.goal;
  const pathAvatar = `./images/avatars/${goal.avatar}.png`;
  const score = goal.ratings && goal.ratings.length ? goal.ratings[0].score :
    undefined;
  const style = (score === undefined) ? {width: 0} :
    {width: `${score*10}%`};

  return (
    <div
      className="goalTile"
      onClick={ () => {
        if (props.step === steps.GOALS_LIST) {
          props.onSelectGoal(goal);
        }
      }}
    >{/* outer div for goal tile */}
      <div className="goalTile_progress goal-tile-rating-green-background0"
        style={style}> {/* green background showing progress */}
      </div>
      <div className="goalTile_avatarContainer">
        <img className="goalTile_img" src={ pathAvatar } />
      </div>
      <div className="goalTile_nameContainer">
        <p>{ goal.name }</p>
      </div>
      <div className="goalTile_rating">
        <p>{ score }</p>
      </div>
    </div>
  );
};

export default tile;
