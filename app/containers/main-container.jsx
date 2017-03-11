import React from 'react';
import { connect } from 'react-redux'

/* components */
import GoalsList from './../components/goals-list/goals-list.jsx';
import AddGoal from './../components/add-new-goal/add-new-goal.jsx';

/* ations */
import action_stepAddGoal from './../actions/goals-list.js';


const MainContent = props => {

  let component;

  switch (props.step.currentStep) {
    case 'ADD_GOAL':
      component = <AddGoal />
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
});

const mapDispatchToProps = dispatch => ({
  stepAddGoal: () => { dispatch(action_stepAddGoal()) },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
