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

  const topRow = availableAvatars.slice(0, 2).map(av => {
    return (
      <div
        className="newGoal_avatarBox"
        key={`avatar_${av}`}
        id={`avatar_${av}`}
      >
        <img src={`${pathToAvatars}${av}.png`} />
      </div>
    )
  })



  return (
    <div className="newGoal_avatarsContainer">
      <div className="newGoal_avatarsContainer-row">
        { topRow }
      </div>
    </div>
  )
};

export default Avatars;
