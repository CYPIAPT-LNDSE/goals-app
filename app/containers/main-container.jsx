import React from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';

/* action creators */
import * as actionsGoalsList from './../actions/goals-list.js';
import * as actionsAddNewGoal from './../actions/add-new-goal.js';
import * as actionsViewGoal from './../actions/view-goal.js';
import * as actionsRateGoal from './../actions/rate-goal.js';
import * as actionsFeedback from './../actions/feedback.js';
import * as actionsGeneral from './../actions/general.js';
import * as actionsEditGoal from './../actions/edit-goal.js';

const actionsMainContainer = {
  ...actionsGoalsList,
  ...actionsAddNewGoal,
  ...actionsViewGoal,
  ...actionsRateGoal,
  ...actionsFeedback,
  ...actionsGeneral,
  ...actionsEditGoal,
};

import router from './../router.jsx';

class MainContent extends React.Component {

  componentWillMount() {
    const screenHeight = window.innerHeight;
    this.props.setScreenHeight(screenHeight);
  }

  componentDidMount() {
    if (!this.props.user.isAuthenticated && !this.props.user.authPending) {
      this.props.setAuthPending();
    }
  }

  render() {

    const props = this.props;

    const navbarHeight = 90;
    const fullPageHeight = `
      ${ Math.max(props.screenHeight - navbarHeight, 400) }px
    `;

    const dynamicStyle = {
      minHeight: fullPageHeight,
    };

    const viewStyle = {
      height: fullPageHeight,
    };

    const view = router(props, viewStyle);

    return (

      <div className="MainContent" style={ dynamicStyle }>
        { view }
      </div>
    );
  }
}

MainContent.propTypes = {
  onReceiveData: PropTypes.func,
  setAuthPending: PropTypes.func,
  user: PropTypes.object,
  setScreenHeight: PropTypes.func,
  goals: PropTypes.array,
  dataLoaded: PropTypes.boolean,
  screenHeight: PropTypes.number,
};

const mapStateToProps = state => ({
  user: state.user,
  goals: state.goals,
  step: state.step,
  newGoal: state.newGoal,
  currentGoal: state.currentGoal,
  deleteModal: state.deleteModal,
  dataLoaded: state.dataLoaded,
  screenHeight: state.screenHeight,
});

export default connect(mapStateToProps, actionsMainContainer)(MainContent);
