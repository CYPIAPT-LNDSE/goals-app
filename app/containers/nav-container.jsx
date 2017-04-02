import React from 'react';
import { connect, } from 'react-redux';
import Nav from '../components/nav.jsx';
import * as actionsNav from './../actions/nav.js';

const NavContent = props => {
  return (
    <Nav
      step= { props.step }
      onNavClick= { props.onNavClick }
      menu={ props.menu }
      toggleMenu = { props.toggleMenu }
    />
  );
};

NavContent.propTypes = {
  step: React.PropTypes.string,
  onNavClick: React.PropTypes.func,
  toggleMenu: React.PropTypes.func,
  menu: React.PropTypes.bool,
};

const mapStateToProps = state => ({
  step: state.step,
  menu: state.menu,
});

const mapDispatchToProps = dispatch => ({
  onNavClick: () => { dispatch(actionsNav.onNavClick()); },
  toggleMenu: () => { dispatch(actionsNav.toggleMenu()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavContent);
