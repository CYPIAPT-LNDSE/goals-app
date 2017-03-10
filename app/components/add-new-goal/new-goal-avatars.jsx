import React from 'react';

const Avatars = () => {

  const pathToAvatars = `./app/public/images/add-new-goal/`;

  // could refactor to get avatars from state in case we want to load from DB?
  const availableAvatars = [
    'sprout',
    'pepper',
    'pumpkin',
    'flower',
  ];

  const createAvatarRow = arr => {
    return arr.map(av => (
      <div
        className="newGoal_avatarBox"
        key={`avatar_${av}`}
        id={`avatar_${av}`}
      >
        <img src={`${pathToAvatars}${av}.png`} />
      </div>
    )
  };

  const topRow = createAvatarRow(availableAvatars.slice(0, 2));
  const bottomRow = createAvatarRow(availableAvatars.slice(2));

  return (
    <div className="newGoal_avatarsContainer">
      <div className="newGoal_avatarsContainer-row">
        { topRow }
      </div>
      <div className="newGoal_avatarsContainer-row">
        { bottomRow }
      </div>
    </div>
  )
};

export default Avatars;
