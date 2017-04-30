import React from 'react';

import * as steps from './../steps.js';

const tile = ({ goal, step, onSelectGoal, visibleEditDelete, onBorderClick,
onDeleteGoal, onEditGoal, }) => {

  const displayedInList = {
    display: goal.deleted
      ? 'none'
      : 'flex',
  };

  const rightBorderStyle = {
    display: step === steps.GOALS_LIST
      ? 'inherit'
      : 'none',
  };

  const progressStyle = {
    width: score === undefined
      ? 0
      : `${score * 10}%`,
    transition: 'width 1s ease',
  };

  const editDeleteStyle = {
    width: visibleEditDelete
      ? '185px'
      : 0,
    display: step === steps.GOALS_LIST
      ? 'flex'
      : 'none',
  };

  const buttonStyle = {
    width: visibleEditDelete
      ? '91px'
      : 0,
  };

  const pathAvatar = avatarName => `./images/avatars/${avatarName}.svg`;

  const score = step === steps.RATE_GOAL || step === steps.FEEDBACK
    ? goal.newRating.score || 0
    : goal.ratings && goal.ratings.length
      ? goal.ratings[0].score
      : undefined;

  const editIcon = './images/icons/edit-icon.svg';
  const deleteIcon = './images/icons/delete-icon.svg';

  const clickGoal = (goal) => {
    if (step === steps.GOALS_LIST) {
      onSelectGoal(goal);
    }
  };

  return (
    <div className="goalTile" style={ displayedInList } >
      <div
        className="outerContainer"
        onClick={ () => { clickGoal(goal); } }
      >
        <div
          className="goalTile_progress goal-tile-rating-green-background0"
          style={ progressStyle }
       />
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
    <div className="edit-delete-container" style={ editDeleteStyle }>
      <div
        className="goalTile_editContainer"
        onClick={ () => { onEditGoal(goal); }}
        style={ buttonStyle }
      >
        <img
          className="goalTile_icon"
          src={ editIcon }
          alt="Edit your goal"
          title="Edit goal"
          style={ buttonStyle }
        />
      </div>
      <div
        className="goalTile_deleteContainer"
        onClick={ () => { onDeleteGoal(goal); } }
        style={ buttonStyle }
      >
        <img
          className="goalTile_icon"
          src={ deleteIcon }
          alt="Edit your goal"
          title="Edit goal"
          style={ buttonStyle }
        />
      </div>
    </div>
    <div
      className="rightBorder"
      onClick = { () => { onBorderClick(goal); }}
      style = { rightBorderStyle }
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
  onEditGoal: React.PropTypes.func,
};

export default tile;
