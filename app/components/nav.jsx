import React from 'react';

import Menu from './../components/menu.jsx';

const Nav = ({ onNavClick, toggleMenu, menu, }) => {

  const path = './images/';
  const pathBack = path + 'icons/back.svg';
  const pathLogo = path + 'logo_header.svg';
  const pathMenu = path + 'icons/menu.svg';

  return (
    <div>
      <Menu menu={ menu } toggleMenu={ toggleMenu }/>
      <nav className="nav">
        <div className="nav_backContainer">
          <img className="back" src={ pathBack } />
        </div>
        <div className="nav_logoContainer">
          <img
            src={ pathLogo }
            alt="Grow"
            title="Grow logo"
            onClick = { onNavClick }
            />
        </div>
        <div className="nav_menuContainer">
          <img className="menu" src={ pathMenu } onClick={ toggleMenu }/>
        </div>
      </nav>
    </div>
  );
};

Nav.propTypes = {
  onNavClick: React.PropTypes.func,
  toggleMenu: React.PropTypes.func,
  menu: React.PropTypes.bool,
};

export default Nav;
