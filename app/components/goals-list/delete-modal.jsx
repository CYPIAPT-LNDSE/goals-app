import React from 'react';

const DeleteModal = ({ toggleDeleteModal, deleteModal, onDeleteGoal, }) => (
  <div className="delete-modal">
    <div className='close-button-container'>
      <button onClick={ toggleDeleteModal }>
        <img src='/images/icons/close-menu.svg' />
      </button>
    </div>
    <div className="delete-modal-content">
      <div className="delete-content-top">
        <h2>Hey champion!</h2>
        <p className="modal-text" id="delete-text-top">
          Are you sure you want to delete your goal?
        </p>
      </div>
      <div className="delete-content-bottom">
        <p className="modal-text" id="delete-text-bottom">If you delete it, all your progress will be deleted</p>
        <div className="delete-button-container">
          <div className="button-outer">
            <button
              className="delete-modal-button"
              onClick={ () => onDeleteGoal(deleteModal.goal)}
            >
              Yup, I'm sure
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
);

DeleteModal.propTypes = {
  toggleDeleteModal: React.PropTypes.func,
  deleteModal: React.PropTypes.boolean,
  onDeleteGoal: React.PropTypes.func,
};

export default DeleteModal;
