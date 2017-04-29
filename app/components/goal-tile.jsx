import React from 'react';

import * as steps from './../steps.js';

const tile = ({ goal, step, onSelectGoal, }) => {

  const pathAvatar = avatarName => `./images/avatars/${avatarName}.svg`;

  const score = step === steps.RATE_GOAL || step === steps.FEEDBACK
    ? goal.newRating.score || 0
    : goal.ratings && goal.ratings.length
      ? goal.ratings[0].score
      : undefined;

  const progressStyle = {
    width: score === undefined
      ? 0
      : `${score * 10}%`,
    transition: 'width 1s ease',
  };

  const clickGoal = (goal) => {
    if (step === steps.GOALS_LIST) {
      onSelectGoal(goal);
    }
  };

  return (
    <div
      className="goal-tile"
      onClick={ () => { clickGoal(goal); }
    }>
      <div
        className="goal-tile-progress goal-tile-rating-green-background0"
        style={ progressStyle }
      ></div>
    <div className="goal-tile_progress"></div>
      <div className="goal-tile-avatar-container">
        <img className="goal-tile-img" src={ pathAvatar(goal.avatar) } />
      </div>
      <div className="goal-tile-name-container">
        <p>{ goal.name }</p>
      </div>
      <div className="goal-tile-rating">
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
