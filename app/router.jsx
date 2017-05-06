import React from 'react';
import PropTypes from 'prop-types';

import * as steps from './steps.js';

/* components */
import GoalsList from './components/goals-list/goals-list.jsx';
import AddGoal from './components/add-new-goal/add-new-goal.jsx';
import ViewGoal from './components/view-goal/view-goal.jsx';
import RateGoal from './components/rate-goal/rate-goal.jsx';
import Feedback from './components/feedback/feedback.jsx';
import LineChartDetail from './components/view-goal/line-chart-detail.jsx';
import EditGoal from './components/edit-goal/edit-goal.jsx';

const router = (props, style) => {

  switch (props.step) {
  case steps.ADD_GOAL: {
    return <AddGoal
        newGoal={ props.newGoal }
        onInputGoal={ props.onInputGoal }
        onSelectAvatar={ props.onSelectAvatar }
        saveNewGoal={ props.saveNewGoal }
        triggerConfirmation={ props.triggerConfirmation }
        screenHeight={ props.screenHeight }
        dynamicStyle={ style }
      />;
  }
  case steps.VIEW_GOAL:
    return <ViewGoal
        currentGoal={ props.currentGoal }
        rateGoal={ props.stepRateGoal }
        stepLineChartDetail={ props.stepLineChartDetail }
        dynamicStyle={ style }
      />;
  case steps.RATE_GOAL:
    return <RateGoal
        currentGoal={ props.currentGoal }
        feedback={ props.stepFeedback }
        onMoveSlider={ props.onMoveSlider }
        setPreviousScore={ props.setPreviousScore }
        dynamicStyle={ style }
      />;
  case steps.FEEDBACK:
    return <Feedback
        currentGoal={ props.currentGoal }
        onInputFeedback={ props.onInputFeedback }
        saveRating={ props.saveRating }
        screenHeight={ props.screenHeight }
        dynamicStyle={ style }
      />;
  case steps.LINE_CHART_DETAIL:
    return <LineChartDetail
      currentGoal={ props.currentGoal }
      onSelectRating={ props.onSelectRating }
      dynamicStyle={ style }
    />;
  case steps.EDIT_GOAL:
    return <EditGoal
      goal={ props.currentGoal }
      newGoal={ props.newGoal }
      onInputEditGoal={ props.onInputEditGoal }
      onSaveEditGoal={ props.onSaveEditGoal }
    />;
  default:
    return <GoalsList
        goals={ props.goals }
        stepAddGoal={ props.stepAddGoal }
        onSelectGoal={ props.onSelectGoal }
        onBorderClick={ props.onBorderClick }
        onDeleteGoal={ props.onDeleteGoal }
        onEditGoal={ props.onEditGoal }
        toggleDeleteModal={ props.toggleDeleteModal }
        deleteModal={ props.deleteModal }
        dataLoaded={ props.dataLoaded }
      />;
  }
};

router.propTypes = {
  step: PropTypes.string,
  goals: PropTypes.array,
  stepAddGoal: PropTypes.func,
  onSelectGoal: PropTypes.func,
  onBorderClick: PropTypes.func,
  onDeleteGoal: PropTypes.func,
  onEditGoal: PropTypes.func,
  onSaveEditGoal: PropTypes.func,
  currentGoal: PropTypes.object,
  onInputGoal: PropTypes.func,
  onSelectAvatar: PropTypes.func,
  onMoveSlider: PropTypes.func,
  onInputFeedback: PropTypes.func,
  stepFeedback: PropTypes.func,
  stepRateGoal: PropTypes.func,
  newGoal: PropTypes.object,
  saveNewGoal: PropTypes.func,
  saveRating: PropTypes.func,
  triggerConfirmation: PropTypes.func,
  setPreviousScore: PropTypes.func,
  stepLineChartDetail: PropTypes.func,
  onSelectRating: PropTypes.func,
  toggleDeleteModal: PropTypes.func,
  onInputEditGoal: PropTypes.func,
  dataLoaded: PropTypes.boolean,
  screenHeight: PropTypes.number,
  deleteModal: PropTypes.boolean,
};

export default router;
