import React from 'react';

class RateGoalSlider extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const value = parseInt(event.target.value, 10);
    this.props.onMoveSlider(parseInt(value));
  }

  render() {

    const getClassName = avatar => `rate-goal-slider-inner rate-goal-slider-${avatar}`;
    return (
      <div className={ getClassName(this.props.goal.avatar) }>
        <input
          className="rate-goal-slider"
          type="range"
          min="0"
          max="10"
          value={ (this.props.goal.newRating.score || 0) }
          step="1"
          onInput={ this.handleChange }
        />
      </div>
    );
  }
}

RateGoalSlider.propTypes = {
  onMoveSlider: React.PropTypes.func,
  goal: React.PropTypes.object,
};

export default RateGoalSlider;
