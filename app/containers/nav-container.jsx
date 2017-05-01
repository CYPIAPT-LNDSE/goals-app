import React from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';

/* components */
import Nav from '../components/nav.jsx';

/* action creators */
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
  step: PropTypes.string,
  onNavClick: PropTypes.func,
  toggleMenu: PropTypes.func,
  onBackButtonClick: PropTypes.func,
  menu: PropTypes.bool,
};

const mapStateToProps = state => ({
  step: state.step,
  menu: state.menu,
});

export default connect(mapStateToProps, actionsNav)(NavContent);
