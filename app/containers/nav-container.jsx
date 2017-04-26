import React from 'react';
import { connect, } from 'react-redux';

import Nav from '../components/nav.jsx';
import * as actionsNav from './../actions/nav.js';

const NavContent = props => {
  return (
    <Nav
      step={ props.step }
      onNavClick={ props.onNavClick }
      onBackButtonClick={ props.onBackButtonClick }
      menu={ props.menu }
      toggleMenu ={ props.toggleMenu }
    />
  );
};

NavContent.propTypes = {
  step: React.PropTypes.string,
  onNavClick: React.PropTypes.func,
  toggleMenu: React.PropTypes.func,
  onBackButtonClick: React.PropTypes.func,
  menu: React.PropTypes.bool,
};

const mapStateToProps = state => ({
  step: state.step,
  menu: state.menu,
});

export default connect(mapStateToProps, actionsNav)(NavContent);
