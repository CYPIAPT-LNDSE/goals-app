import React from 'react';
import PropTypes from 'prop-types';

class FeedbackInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onInputFeedback(event.target.value);
  }

  render() {
    return (
      <div className="feedback-input-container">
        <textarea
          name="new-feedback"
          id="newFeedbackInput"
          maxLength="140"
          value={ this.props.comment }
          placeholder="I gave my goal this reason because..."
          className="feedback-input"
          type="text"
          onKeyUp={ this.handleChange }
          onChange={ this.handleChange }
          autoFocus={ this.props.screenHeight > 600 }
        />
      </div>
    );
  }
}

FeedbackInput.propTypes = {
  onInputFeedback: PropTypes.func,
  comment: PropTypes.string,
  screenHeight: PropTypes.number,
};

export default FeedbackInput;
