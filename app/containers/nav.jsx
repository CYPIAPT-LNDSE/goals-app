import React from 'react';

const Nav = props => {

  const path = "./app/public/icons/";
  const pathBack = path + "back.svg";
  const pathMenu = path + "menu.svg";

  return (
    <nav className="nav">
      <div className="nav_backContainer">
        <img className="back" src={ pathBack } />
      </div>
      <div className="nav_logoContainer">
        <h1>
          Grow
        </h1>
      </div>
      <div className="nav_menuContainer">
        <img className="menu" src={ pathMenu } />
      </div>
    </nav>
  );
};

export default Nav;
