import React from 'react';
import { connect, } from 'react-redux';

/* actions */
import * as actionsGoalsList from './../actions/goals-list.js';
import * as actionsAddNewGoal from './../actions/add-new-goal.js';
import * as actionsViewGoal from './../actions/view-goal.js';
import * as actionsRateGoal from './../actions/rate-goal.js';
import * as actionsFeedback from './../actions/feedback.js';
import * as actionsGeneral from './../actions/general.js';

const actionsMainContainer = {
  ...actionsGoalsList,
  ...actionsAddNewGoal,
  ...actionsViewGoal,
  ...actionsRateGoal,
  ...actionsFeedback,
  ...actionsGeneral,
};

import router from './../router.js';

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
  onReceiveData: React.PropTypes.func,
  setAuthPending: React.PropTypes.func,
  user: React.PropTypes.object,
  setScreenHeight: React.PropTypes.func,
  goals: React.PropTypes.array,
  dataLoaded: React.PropTypes.boolean,
  screenHeight: React.PropTypes.number,
};

const mapStateToProps = state => ({
  user: state.user,
  goals: state.goals,
  step: state.step,
  newGoal: state.newGoal,
  currentGoal: state.currentGoal,
  dataLoaded: state.dataLoaded,
  screenHeight: state.screenHeight,
});

export default connect(mapStateToProps, actionsMainContainer)(MainContent);
