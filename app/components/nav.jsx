import React from 'react';
import * as steps from '../steps.js';
const Nav = ({ onNavClick, onBackButtonClick, step }) => {

  const path = "./images/";
  const pathBack = path + "icons/back.svg";
  const pathLogo = path + "logo_header.png";
  const pathMenu = path + "icons/menu.svg";

  const style = (step === steps.GOALS_LIST) ? {visibility: "hidden"} : {};
  return (
    <nav className="nav">
      <div className="nav_backContainer">
        <img className="back" src={ pathBack }
              onClick = { onBackButtonClick } style={style} />
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
        <img className="menu" src={ pathMenu } />
      </div>
    </nav>
  );
};

export default Nav;
