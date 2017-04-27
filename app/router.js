import React from 'react';

import * as steps from './steps.js';

/* components */
import GoalsList from './components/goals-list/goals-list.jsx';
import AddGoal from './components/add-new-goal/add-new-goal.jsx';
import ViewGoal from './components/view-goal/view-goal.jsx';
import RateGoal from './components/rate-goal/rate-goal.jsx';
import Feedback from './components/feedback/feedback.jsx';
import LineChartDetail from './components/view-goal/line-chart-detail.jsx';

const router = (props) => {

  switch (props.step) {
  case steps.ADD_GOAL: {
    return <AddGoal
        newGoal={ props.newGoal }
        onInputGoal={ props.onInputGoal }
        onSelectAvatar={ props.onSelectAvatar }
        saveNewGoal={ props.saveNewGoal }
        triggerConfirmation= { props.triggerConfirmation }
      />;
  }
  case steps.VIEW_GOAL:
    return <ViewGoal
        currentGoal = { props.currentGoal }
        rateGoal={ props.stepRateGoal }
        stepLineChartDetail = { props.stepLineChartDetail }
      />;
  case steps.RATE_GOAL:
    return <RateGoal
        currentGoal={ props.currentGoal }
        feedback={ props.stepFeedback }
        onMoveSlider={ props.onMoveSlider }
        setPreviousScore={ props.setPreviousScore }
      />;
  case steps.FEEDBACK:
    return <Feedback
        currentGoal={ props.currentGoal }
        onInputFeedback= { props.onInputFeedback }
        saveRating= { props.saveRating }
      />;
  case steps.LINE_CHART_DETAIL:
    return <LineChartDetail
      currentGoal={ props.currentGoal }
      onSelectRating={ props.onSelectRating }
    />;
  default:
    return <GoalsList
        goals={ props.goals }
        stepAddGoal={ props.stepAddGoal }
        onSelectGoal={ props.onSelectGoal }
        visibleEditDelete={ props.visibleEditDelete }
        onBorderClick={ props.onBorderClick }
      />;
  }
};

router.propTypes = {
  step: React.PropTypes.string,
  goals: React.PropTypes.array,
  stepAddGoal: React.PropTypes.func,
  onSelectGoal: React.PropTypes.func,
  visibleEditDelete: React.PropTypes.bool,
  onBorderClick: React.PropTypes.func,
  currentGoal: React.PropTypes.object,
  onInputGoal: React.PropTypes.func,
  onSelectAvatar: React.PropTypes.func,
  onMoveSlider: React.PropTypes.func,
  onInputFeedback: React.PropTypes.func,
  stepFeedback: React.PropTypes.func,
  stepRateGoal: React.PropTypes.func,
  newGoal: React.PropTypes.object,
  saveNewGoal: React.PropTypes.func,
  saveRating: React.PropTypes.func,
  triggerConfirmation: React.PropTypes.func,
  setPreviousScore: React.PropTypes.func,
  stepLineChartDetail: React.PropTypes.func,
  onSelectRating: React.PropTypes.func,
};

export default router;
