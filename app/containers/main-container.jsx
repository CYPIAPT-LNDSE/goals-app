import React from 'react';
import { connect, } from 'react-redux';

/* actions */
import * as actionsGoalsList from './../actions/goals-list.js';
import * as actionsAddNewGoal from './../actions/add-new-goal.js';
import * as actionsViewGoal from './../actions/view-goal.js';
import * as actionsRateGoal from './../actions/rate-goal.js';
import * as actionsFeedback from './../actions/feedback.js';
import * as actionsGeneral from './../actions/general.js';

import router from './../router.js';
import socket from '../sockets.js';

const MainContent = props => {


  socket.on('userdata', (data) => {
    props.onReceiveData(data);

  });

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

};

const mapStateToProps = state => ({
  goals: state.goals,
  step: state.step,
  newGoal: state.newGoal,
  currentGoal: state.currentGoal,
});

const mapDispatchToProps = dispatch => ({
  /* goals list actions */
  stepAddGoal: () => { dispatch(actionsGoalsList.stepAddGoal()); },
  onSelectGoal: (goal) => { dispatch(actionsGoalsList.selectGoal(goal)); },
  /* add goal actions */
  onInputGoal: (text) => { dispatch(actionsAddNewGoal.inputGoal(text)); },
  onSelectAvatar: (avatar) => { dispatch(actionsAddNewGoal.selectAvatar(avatar)); },
  saveNewGoal: (goal) => { dispatch(actionsAddNewGoal.saveNewGoal(goal)); },
  triggerConfirmation: () => { dispatch(actionsAddNewGoal.triggerConfirmation()); },
  /*view goal actions*/
  stepRateGoal: () => { dispatch(actionsViewGoal.stepRateGoal()); },
  /* rate goal actions */
  onMoveSlider: (rating) => { dispatch(actionsRateGoal.moveSlider(rating)); },
  stepFeedback: () => { dispatch(actionsRateGoal.stepFeedback()); },
  setPreviousScore: () => { dispatch((actionsRateGoal.setPreviousScore()));},
  /* goal feedback actions */
  onInputFeedback: (input) => { dispatch(actionsFeedback.inputFeedback(input)); },
  saveRating: (time, id) => { dispatch(actionsFeedback.saveRating(time, id)); },
  /* general */
  onReceiveData: (data) => { dispatch(actionsGeneral.receiveDbData(data)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
