import React from 'react';

class RateGoalSlider extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    console.log(event.target)
    this.props.onMoveSlider(event.target.value);
  }

  render() {
    return (
      <div className="rate-goal-slider-inner">
        <input
          className="rate-goal-slider"
          type="range"
          min="0"
          max="10"
          value={ (this.props.goal.newRating || 0) }
          step="1"
          onInput={ this.handleChange }
        />
      </div>
    )
  };
}

export default RateGoalSlider;
