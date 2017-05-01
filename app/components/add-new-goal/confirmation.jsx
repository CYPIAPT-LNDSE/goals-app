import React from 'react';
import PropTypes from 'prop-types';

class ConfirmationModal extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.timer = setTimeout(this.props.saveGoal, 2500);
  }

  render() {

    return (
      <div className="confirmation-modal">
        <p className="modal-text">Hooray!</p>
        <svg className="confirmation-tick" id="tick" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 37 37" xmlSpace="preserve">
          <path className="circ path" d="M30.5,6.5L30.5,6.5c6.6,6.6,6.6,17.4,0,24l0,0c-6.6,6.6-17.4,6.6-24,0l0,0c-6.6-6.6-6.6-17.4,0-24l0,0C13.1-0.2,23.9-0.2,30.5,6.5z"/>
           <polyline className="tick path" points="11.6,20 15.9,24.2 26.4,13.8 "/>
        </svg>
        <a onClick={ ()=> {
          clearTimeout(this.timer);
          this.props.saveGoal();
        }
        }>Ok</a>
      </div>
    );
  }
}

ConfirmationModal.propTypes = {
  saveGoal: PropTypes.func,
  confirmation: PropTypes.bool,
};

export default ConfirmationModal;
