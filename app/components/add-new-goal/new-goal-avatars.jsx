import React from 'react';

import availableAvatars from './../../avatars.js';

const avatarNames = availableAvatars.map(av => av.avatar);

class Avatars extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onSelectAvatar(event.target.value);
  }

  render() {
    const pathToAvatars = avatar => `images/add-new-goal/${avatar}.png`;

    const createAvatarRow = arr =>
      arr.map(av => (
        <div
          className="newGoal_avatarBox"
          key={`avatar_${av}`}
          onClick={ this.handleChange }
        >
        <label id={`avatar_${av}`}>
          <input
            type="radio"
            name="avatar"
            value={ av }
          />
          <img src={ pathToAvatars(av) } />
        </label>
      </div>
      )
    );
    const topRow = createAvatarRow(avatarNames.slice(0, 2));
    const bottomRow = createAvatarRow(avatarNames.slice(2));

    return (
      <div className="newGoal_avatarsContainer">
        <div className="newGoal_avatarsContainer-row">
          { topRow }
        </div>
        <div className="newGoal_avatarsContainer-row">
          { bottomRow }
        </div>
      </div>
    );
  }
}

Avatars.propTypes = {
  onSelectAvatar: React.PropTypes.func,
};

export default Avatars;
