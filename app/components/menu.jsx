import React from 'react';

const Menu = ({ menu, toggleMenu, }) => {

  const style = {
    visibility: menu ? 'visible' : 'hidden',
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
          target="blank">
          About Grow
        </a>
        <a href="/logout">Log out</a>
      </div>
    </div>
  );
};

Menu.proptypes = {
  menu: React.PropTypes.bool,
};

export default Menu;
