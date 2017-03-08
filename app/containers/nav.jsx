import React from 'react';

const Nav = props => {
  return (
    <nav className="nav">
      <div className="nav_logoContainer">
        <h1>
          Grow
        </h1>
      </div>
      <div className="nav_menuContainer">
        <img className="menu" src="./app/public/icons/menu.svg" />
      </div>
    </nav>
  );
};

export default Nav;
