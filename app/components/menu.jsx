import React from 'react';
import PropTypes from 'prop-types';

const MenuComponent = ({ menu, toggleMenu, }) => {

  const fadeIn = 'z-index 0.1s, opacity 0.4s ease 0.1s';
  const fadeOut = 'opacity 0.4s, z-index 0.1s ease 0.4s';

  const style = {
    transition: menu ? fadeIn : fadeOut,
    opacity: menu ? 1 : 0,
    zIndex: menu ? 3 : -1,
  };

  return (
    <div className='menu-modal' style={ style }>
      <div className='close-button-container'>
        <button onClick={ toggleMenu }>
          <img src='/images/icons/close-menu.svg' />
        </button>
      </div>
      <div className='menu-links-container'>
        <a
          href="https://github.com/CYPIAPT-LNDSE/goals-app"
          target="_blank"
        >About Grow</a>
        <a href="/logout">Log out</a>
      </div>
    </div>
  );
};

MenuComponent.propTypes = {
  menu: PropTypes.bool,
  toggleMenu: PropTypes.func,
};

export default MenuComponent;
