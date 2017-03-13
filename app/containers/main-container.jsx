import React from 'react';
import { connect } from 'react-redux'

/* components */
import GoalsList from './../components/goals-list/goals-list.jsx';
import AddGoal from './../components/add-new-goal/add-new-goal.jsx';

/* actions */
import action_stepAddGoal from './../actions/goals-list.js';
import action_inputGoal from './../actions/add-new-goal.js';

/* steps */
import * as steps from './../steps.js';

const MainContent = props => {

  let component;

  switch (props.step) {
    case steps.ADD_GOAL:
      component = <AddGoal
        newGoal = { props.newGoal }
        onInputGoal={ props.onInputGoal }
      />
      break;
    default:
      component = <GoalsList
        goals={ props.goals }
        stepAddGoal={ props.stepAddGoal }
      />
  }
  const navbarHeight = 90;

  const dynamicStyle = {
    height: window.innerHeight - 90,
  }

  return (
    <div className="MainContent" style={ dynamicStyle }>
      { component }
    </div>
  );
}

const mapStateToProps = state => ({
  goals: state.goals,
  step: state.step,
  newGoal: state.newGoal,
});

const mapDispatchToProps = dispatch => ({
  stepAddGoal: () => { dispatch(action_stepAddGoal()) },
  onInputGoal: (text) => { dispatch(action_inputGoal(text)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
