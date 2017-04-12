import React from 'react';

const MenuComponent = ({ menu, toggleMenu, }) => {

  const style = {
    transition: 'opacity 0.2s',
    opacity: menu ? 1 : 0,
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

MenuComponent.proptypes = {
  menu: React.PropTypes.bool,
  toggleMenu: React.PropTypes.func,
};

export default MenuComponent;
