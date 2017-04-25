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

  let isVisible = false;

  let editStyle = (isVisible) ? {
    visibility : 'visible',
    borderLeft : '5px solid #1F65AC',
  } : {};

  const deleteStyle = {
    visibility : 'hidden',
  };

  const clickBorder = () => {
    console.log('clicked');
    console.log(editStyle);
    isVisible = true;
  };

  const clickGoal = (goal) => {
    if (step === steps.GOALS_LIST) {
      onSelectGoal(goal);
    }
  };

  return (
    <div className="goalTile">
    <div
      className="outerContainer"
      onClick={ () => { clickGoal(goal); }
    }>
    <div
      className="goalTile_progress goal-tile-rating-green-background0"
      style={ progressStyle }
      ></div>
    <div className="goalTile_progress"></div>
    <div className="goalTile_avatarContainer">
      <img className="goalTile_img" src={ pathAvatar(goal.avatar) } />
    </div>
    <div className="goalTile_nameContainer">
      <p>{ goal.name }</p>
    </div>
    <div className="goalTile_rating">
      <p>{ score }</p>
    </div>
  </div>
    <div
      className="goalTile_editContainer"
      style={ editStyle }
      >
      { /* img of edit pen */ }
    </div>
    <div className="goalTile_deleteContainer">
      { /* img of delete bin */ }
    </div>
    <div className="rightBorder" onClick = {clickBorder} />
  </div>
  );
};

tile.propTypes = {
  goal: React.PropTypes.object,
  step: React.PropTypes.string,
  onSelectGoal: React.PropTypes.func,
};

export default tile;
