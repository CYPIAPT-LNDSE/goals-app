import React from 'react';
import { connect } from 'react-redux'

/* components */
import GoalsList from './../components/goals-list/goals-list.jsx';
import AddGoal from './../components/add-new-goal/add-new-goal.jsx';

/* actions */
import action_stepAddGoal from './../actions/goals-list.js';
import * as actionsAddNewGoal from './../actions/add-new-goal.js';

/* steps */
import * as steps from './../steps.js';

const MainContent = props => {

  let component;

  const newGoalId = (props.goals.map(g => g.id).sort((a, b) => b - a)[0] + 1 || 0);

  switch (props.step) {
    case steps.ADD_GOAL:
      component = <AddGoal
        newGoal = { props.newGoal }
        onInputGoal={ props.onInputGoal }
        onSelectAvatar={ props.onSelectAvatar }
        saveNewGoal= { props.saveNewGoal }
        newGoalId= { newGoalId }
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
    height: window.innerHeight - navbarHeight,
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
  onInputGoal: (text) => { dispatch(actionsAddNewGoal.inputGoal(text)) },
  onSelectAvatar: (avatar) => { dispatch(actionsAddNewGoal.selectAvatar(avatar)) },
  saveNewGoal: (goal) => { dispatch(actionsAddNewGoal.saveNewGoal(goal)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
