import React from 'react';

import * as steps from './../steps.js';

const tile = ({ goal, step, onSelectGoal, visibleEditDelete, onBorderClick,
onDeleteGoal, }) => {

  const visible = (goal.deleted) ?
  { display: 'none', } :
  { display: 'flex', };
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

  const editIcon = './images/icons/edit-icon.svg';
  const deleteIcon = './images/icons/delete-icon.svg';

  const editStyle = (visibleEditDelete) ?
  { visibility : 'visible', } :
  { visibility : 'hidden' , };

  const deleteStyle = (visibleEditDelete) ?
  { visibility : 'visible', } :
  { visibility : 'hidden', };

  const clickGoal = (goal) => {
    if (step === steps.GOALS_LIST) {
      onSelectGoal(goal);
    }
  };

  return (
    <div className="goalTile" style={visible}>
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
      <img
        className="goalTile_icon"
        src={ editIcon }
        alt="Edit your goal"
        title="Edit goal"
      />
    </div>
    <div
      className="goalTile_deleteContainer"
      style={ deleteStyle }
      onClick={ () => { onDeleteGoal(goal); }}
      >
      <img
        className="goalTile_icon"
        src={ deleteIcon }
        alt="Edit your goal"
        title="Edit goal"
      />
    </div>
    <div
      className="rightBorder"
      onClick = { () => { onBorderClick(goal); }}
    />
  </div>
  );
};

tile.propTypes = {
  goal: React.PropTypes.object,
  step: React.PropTypes.string,
  onSelectGoal: React.PropTypes.func,
  visibleEditDelete: React.PropTypes.bool,
  onBorderClick: React.PropTypes.func,
  onDeleteGoal: React.PropTypes.func,
};

export default tile;
