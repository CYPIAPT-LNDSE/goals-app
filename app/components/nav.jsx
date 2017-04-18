import React from 'react';

import * as steps from '../steps.js';
import Menu from './../components/menu.jsx';

const Nav = ({ onNavClick, onBackButtonClick, step, menu, toggleMenu, }) => {

  const path = './images/';
  const pathBack = path + 'icons/back.svg';
  const pathLogo = path + 'logo_header.svg';
  const pathMenu = path + 'icons/menu.svg';
  const backButtonStyle = (step === steps.GOALS_LIST)
    ? { visibility: 'hidden', }
    : {};

  return (
    <div>
      <Menu menu={ menu } toggleMenu={ toggleMenu }/>
      <nav className="nav">
        <div className="nav_backContainer">
          <img
            className="back"
            src={ pathBack }
            onClick = { onBackButtonClick }
            style={ backButtonStyle }
          />
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
          <img
            className="menu"
            src={ pathMenu }
            onClick={ toggleMenu }
          />
        </div>
      </nav>
      <Menu menu={ menu } toggleMenu={ toggleMenu }/>
    </div>
  );
};

Nav.propTypes = {
  onNavClick: React.PropTypes.func,
  toggleMenu: React.PropTypes.func,
  menu: React.PropTypes.bool,
  onBackButtonClick: React.PropTypes.func,
  step: React.PropTypes.string,
};

export default Nav;
