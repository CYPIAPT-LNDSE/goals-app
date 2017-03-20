import React from 'react';
import { connect } from 'react-redux'

/* actions */
import * as actionsGoalsList from './../actions/goals-list.js';
import * as actionsAddNewGoal from './../actions/add-new-goal.js';

import router from './../router.js';

const MainContent = props => {

  const view = router(props);

  const navbarHeight = 90;
  const dynamicStyle = {
    height: window.innerHeight - navbarHeight,
  };

  return (
    <div className="MainContent" style={ dynamicStyle }>
      { view }
    </div>
  );
}

const mapStateToProps = state => ({
  goals: state.goals,
  step: state.step,
  newGoal: state.newGoal,
  currentGoal: state.currentGoal
});

const mapDispatchToProps = dispatch => ({
  stepAddGoal: () => { dispatch(actionsGoalsList.stepAddGoal()) },
  onInputGoal: (text) => { dispatch(actionsAddNewGoal.inputGoal(text)) },
  onSelectAvatar: (avatar) => { dispatch(actionsAddNewGoal.selectAvatar(avatar)) },
  saveNewGoal: (goal) => { dispatch(actionsAddNewGoal.saveNewGoal(goal)) },
  onSelectGoal: (goal) => { dispatch(actionsGoalsList.selectGoal(goal)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
