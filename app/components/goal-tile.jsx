import React from 'react';

const tile = props => {

  const goal = props.goal;
  const pathAvatar = `./app/public/images/avatars/${goal.avatar}.png`;

  return (
    <div className="goalTile" style={ style }> {/* outer div for goal tile */}
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

export default tile;
