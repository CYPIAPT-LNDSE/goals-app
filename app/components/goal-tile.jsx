import React from 'react';

import * as steps from './../steps.js';

const tile = ({ goal, step, onSelectGoal, visibleEditDelete, onBorderClick,
  onEditGoal, toggleDeleteModal, }) => {

  const displayInList = (goal.deleted)
    ? { display: 'none', }
    : { display: 'flex', };

  const rightBorderStyle = (step === steps.GOALS_LIST)
    ? { visibility: 'visible', }
    : { visibility: 'hidden', };

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

  const editIcon = './images/icons/edit-icon.svg';
  const deleteIcon = './images/icons/delete-icon.svg';
  const pathAvatar = avatarName => `./images/avatars/${avatarName}.svg`;

  const score = step === steps.RATE_GOAL || step === steps.FEEDBACK
    ? goal.newRating.score || 0
    : goal.ratings && goal.ratings.length
      ? goal.ratings[0].score
      : undefined;

  const clickGoal = (goal) => {
    if (step === steps.GOALS_LIST) {
      onSelectGoal(goal);
    }
  };

  return (
    <div className="goalTile" style={ displayInList }>
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
      style={ editDeleteStyle }
      onClick={ () => { onEditGoal(goal); }}
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
      style={ editDeleteStyle }
      onClick={ () => { toggleDeleteModal(goal); } }
    >
      <img
        className="goalTile_icon"
        src={ deleteIcon }
        alt="Edit your goal"
        title="Edit goal"
        style={ buttonStyle }
      />
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
  toggleDeleteModal: React.PropTypes.func,
};

export default tile;
