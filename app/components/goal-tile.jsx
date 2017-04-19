import React from 'react';

import * as steps from './../steps.js';

const tile = ({ goal, step, onSelectGoal, }) => {

  const pathAvatar = `./images/avatars/${goal.avatar}.svg`;
  const score = step === steps.RATE_GOAL
    ? goal.newRating.score || 0
    : goal.ratings && goal.ratings.length
      ? goal.ratings[0].score
      : undefined;

  const style = {
    width: (score === undefined) ? 0 : `${score * 10}%`,
    transition: 'width 1s ease',
  };

  const clickGoal = (goal) => {
    if (step === steps.GOALS_LIST) {
      onSelectGoal(goal);
    }
  };

  return (
    <div className="goalTile" onClick={ () => { clickGoal(goal); } }>
      <div
        className="goalTile_progress goal-tile-rating-green-background0"
        style={ style }
      ></div>
      <div className="goalTile_progress"></div>
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

tile.propTypes = {
  goal: React.PropTypes.object,
  step: React.PropTypes.string,
  onSelectGoal: React.PropTypes.func,
};

export default tile;
