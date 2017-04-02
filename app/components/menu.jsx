import React from 'react';

const menu = () => {
  return (
    <div className='menu-modal'>
      <div className='close-button-container'>
        <button>
          <img src='/images/icons/close-menu.svg' />
        </button>
      </div>
      <div className='menu-links-container'>
        <a>About Grow</a>
        <a>Log out</a>
      </div>
    </div>
  );
};

export default menu;
