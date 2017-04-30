import React from 'react';

class NewGoalInput extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onInputGoal(event.target.value);
  }

  render() {
    return (
      <div className="new-goal-input-container-inner">
        <textarea
          name="new-goal"
          id="newGoalInput"
          maxLength="50"
          value={ this.props.newGoal.name }
          placeholder="My goal is..."
          className="new-goal-input"
          type="text"
          onKeyUp={ this.handleChange }
          onChange={ this.handleChange }
          autoFocus={ this.props.screenHeight > 600 }
        />
      </div>
    );
  }
}

NewGoalInput.propTypes = {
  onInputGoal: React.PropTypes.func,
  newGoal: React.PropTypes.object,
  screenHeight: React.PropTypes.number,
};

export default NewGoalInput;
