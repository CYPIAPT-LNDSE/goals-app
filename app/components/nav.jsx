import React from 'react';

const Nav = () => {

  const path = './images/';
  const pathBack = path + 'icons/back.svg';
  const pathLogo = path + 'logo_header.svg';
  const pathMenu = path + 'icons/menu.svg';

  return (
    <nav className="nav">
      <div className="nav_backContainer">
        <img className="back" src={ pathBack } />
      </div>
      <div className="nav_logoContainer">
        <img
          src={ pathLogo }
          alt="Grow"
          title="Grow logo"
        />
      </div>
      <div className="nav_menuContainer">
        <img className="menu" src={ pathMenu } />
      </div>
    </nav>
  );
};

export default Nav;
