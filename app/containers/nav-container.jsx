import React from 'react';
import { connect } from 'react-redux';
import Nav from '../components/nav.jsx';
import * as actionsNav from './../actions/nav.js';

const NavContent = props => {
  return (
    <Nav
      step= { props.step }
      onNavClick= { props.onNavClick }
      onBackButtonClick= { props.onBackButtonClick } />
  );
}

const mapStateToProps = state => ({
  step: state.step,
});

const mapDispatchToProps = dispatch => ({
  onNavClick: () => { dispatch(actionsNav.onNavClick()) },
  onBackButtonClick: () => { dispatch(actionsNav.onBackButtonClick()) },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavContent);
