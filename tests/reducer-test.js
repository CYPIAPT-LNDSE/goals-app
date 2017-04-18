const tape = require('tape');

const types = require('./../app/action_types.js');
const steps = require('./../app/steps.js');

/* functions to be tested */
const reducer = require('./../app/reducers/index.js').default;
const saveRating = require('./../app/reducers/index.js').saveRating;
const backStep = require('./../app/reducers/index.js').backStep;
const increaseUpdateCount = require('./../app/reducers/index.js').increaseUpdateCount;
const addGoalToArray = require('./../app/reducers/index.js').addGoalToArray;
const addRatingToCurrentGoal = require('./../app/reducers/index.js').addRatingToCurrentGoal;
const constructNewRating = require('./../app/reducers/index.js').constructNewRating;

const defaultState = {
  goals: [],
  step: steps.GOALS_LIST,
  previousStep: null,
  newGoal: {},
  currentGoal: null,
};

tape(`backstep function switches step property to last step in
  user journey, and switches previousStep to the step before`, (t) => {

  const stateGoalsList = {
    ...defaultState,
    step: steps.GOALS_LIST,
  };
  const stateAddGoal = {
    ...defaultState,
    step: steps.ADD_GOAL,
    previousStep: steps.GOALS_LIST,
  };
  const stateViewGoal = {
    ...defaultState,
    step: steps.VIEW_GOAL,
    previousStep: steps.GOALS_LIST,
  };
  const stateRateGoalFromViewGoal = {
    ...defaultState,
    step: steps.RATE_GOAL,
    previousStep: steps.VIEW_GOAL,
  };
  const stateRateGoalFromGoalsList = {
    ...defaultState,
    step: steps.RATE_GOAL,
    previousStep: steps.GOALS_LIST,
    currentGoal: {
      newRating: {},
    },
  };
  const stateFeedback = {
    ...defaultState,
    step: steps.FEEDBACK,
    previousStep: steps.RATE_GOAL,
    currentGoal: {
      newRating: {},
    },
  };

  const stateLineChartDetail = {
    ...defaultState,
    step: steps.LINE_CHART_DETAIL,
    previousStep: steps.GOALS_LIST,
    currentGoal: {},
  };
  /* default */
  t.equal(backStep(stateGoalsList).previousStep, null, `default case: previous
    step not changed`);
  /* add goal page */
  t.equal(backStep(stateAddGoal).step, steps.GOALS_LIST, `step switched from
    add-goal page to goals list`);
  t.equal(backStep(stateAddGoal).previousStep, null, `when on add-goal page,
    previousStep set to null`);
  /* view goal page */
  t.equal(backStep(stateViewGoal).step, steps.GOALS_LIST, `when on view-goal
    page, step set to goals list`
  );
  t.equal(backStep(stateViewGoal).previousStep, null, `when going from view
    goal page to goals list, previous step set to null`
  );
  /* rate goal page */
  t.equal(backStep(stateRateGoalFromViewGoal).step, steps.VIEW_GOAL, `when on
    rate goal page, step back switched to view goal page`
  );
  t.equal(backStep(stateRateGoalFromViewGoal).previousStep, null, `when
    switching from rate-goal page to view goal page, previousStep is set to
    goals list`
  );
  t.equal(backStep(stateRateGoalFromGoalsList).step, steps.GOALS_LIST, `when
    step is rate-goal and user has come from goals list, step is switched
    back to goals list`
  );
  t.equal(backStep(stateRateGoalFromGoalsList).previousStep, null, `when
    switching from rate-goal page to goals list, previousStep is set to null`
  );
  /* feedback page */
  t.equal(backStep(stateFeedback).step, steps.RATE_GOAL, `step back from
    feedback page sets step to rate-goal page`);
  t.equal(backStep(stateFeedback).previousStep, steps.RATE_GOAL, `previous step
    not changed on step back from feedback page`);
  t.equal(backStep(stateLineChartDetail).step, steps.VIEW_GOAL, `step back from
    line chart detail page sets page to view goal page`);
  t.equal(backStep(stateLineChartDetail).previousStep, steps.GOALS_LIST, `step
    back grom line chart detail page does not change previous step
    (stays on goals list)`);
  t.end();
});

tape(`test reducer nav click: step and previousStep changed, current goal
  is set to null`, (t) => {

  const initialState = defaultState;
  const actionOnNavClick = {
    type: types.NAV_CLICK,
  };

  t.equal(
    reducer(initialState, actionOnNavClick).step,
    steps.GOALS_LIST,
    'sets step to goals list'
  );
  t.equal(
    reducer(initialState, actionOnNavClick).previousStep,
    null,
    'previous step set to null'
  );
  t.deepEqual(
    reducer(initialState, actionOnNavClick).currentGoal,
    {},
    'current goal is now an empty object'
  );
  t.end();
});

tape(`increaseUpdateCount function takes an object and increments the
  updateCount value by one`, (t) => {
  const goal1 = {
    name: 'my best goal',
    updateCount: 0,
  };
  const goal2 = {
    name: 'my new goal',
  };

  t.equal(increaseUpdateCount(goal1).updateCount, 1, 'count increased by 1');
  t.equal(increaseUpdateCount(goal2).updateCount, 1, 'count set to 1 if undefined');
  t.end();
});

tape('constructNewRating makes a new rating object', (t) => {
  const initialState = {
    ...defaultState,
    currentGoal: {
      newRating: {
        score: 8,
        comment: 'amazing',
      },
    },
  };

  const newRating = constructNewRating(initialState, 'today', 0);
  t.equal(Object.keys(newRating).length, 4, 'new object has 4 properties');
  t.equal(newRating.score, 8, 'score is 8');
  t.end();
});

tape(`addGoalToArray takes the state and an action with a goal and
  concatenates the goals`, (t) => {
  const goal1 = {
    name: 'my best goal',
    updateCount: 0,
  };
  const goal2 = {
    name: 'my new goal',
  };
  const initialState = {
    ...defaultState,
    goals: [ goal1, ],
  };
  const fn = goal => {
    return {
      ...goal,
      updateCount: 3,
    };
  };
  const action = { goal: goal2, };

  t.equal(addGoalToArray(initialState, action).length, 2, '2 goals in array');
  t.equal(addGoalToArray(initialState, action, fn).length, 2,
      'still 2 goals in array'
    );
  t.equal(addGoalToArray(initialState, action, fn).pop().updateCount, 3,
      'optional function applied'
    );
  t.end();
});

tape('addRatingToCurrentGoal concatenates ratings and sets newRating to empty obj', (t) => {
  const initialState = {
    ...defaultState,
    currentGoal: {
      name: 'my best goal',
      ratings: [],
    },
  };
  const newRating = {
    score: 0,
    id: 0,
    time: 'today',
    comment: 'cool comment',
  };

  const updatedGoal = addRatingToCurrentGoal(initialState, newRating);
  t.equal(updatedGoal.ratings.length, 1, 'one rating in new ratings array');
  t.deepEqual(updatedGoal.newRating, {}, 'newRating is empty obj');
  t.end();
});

tape('toggleMenu shows and hides menu', (t) => {
  const stateVisible = {
    ...defaultState,
    menu: true,
  };

  const stateHidden = {
    ...defaultState,
    menu: false,
  };

  const actionToggle = {
    type: types.TOGGLE_MENU,
  };

  t.equal(reducer(stateVisible, actionToggle).menu, false, 'menu hidden if already showing');
  t.equal(reducer(stateHidden, actionToggle).menu, true, 'menu hidden if already showing');
  t.end();
});

tape('test reducer step_add_goal: step and previousStep changed', (t) => {

  const initialState = defaultState;
  const actionStepAddGoal = { type: types.STEP_ADD_GOAL, };

  t.equal(
    reducer(initialState, actionStepAddGoal).step,
    steps.ADD_GOAL,
    'step add goal sets correct step'
  );

  t.equal(
    reducer(initialState, actionStepAddGoal).previousStep,
    steps.GOALS_LIST,
    'step add goal sets correct step'
  );

  t.end();
});

tape('test reducer case input_goal: input value is added to state', (t) => {

  const initialState = { ...defaultState, step: steps.ADD_GOAL, };
  const input = 'I will test test t';
  const actionInputGoal = {
    type: types.INPUT_GOAL,
    input: input,
  };

  t.equal(
    reducer(initialState, actionInputGoal).newGoal.name,
    input,
    'input value added to state'
  );

  t.end();
});

tape('test reducer case SELECT_AVATAR: newgoal.avatar value is updated', (t) => {

  const initialState = { ...defaultState, step: steps.ADD_GOAL, };
  const avatar = 'monkey';
  const actionSelectAvatar = {
    type: types.SELECT_AVATAR,
    avatar: avatar,
  };

  t.equal(
    reducer(initialState, actionSelectAvatar).newGoal.avatar,
    avatar,
    'avatar value updated'
  );
  t.end();
});

tape(`test reducer case TRIGGER_CONFIRMATION: sets confirmation property of
  newGoal object to true`, (t) => {

  const initialState = {
    ...defaultState,
    newGoal: {
      name: 'my new goal',
    },
  };

  const actionTriggerConfirmation = {
    type: types.TRIGGER_CONFIRMATION,
  };

  t.equal(reducer(initialState, actionTriggerConfirmation).newGoal.confirmation, true);
  t.end();

});

tape('test reducer case SAVE_NEW_GOAL: adds new goal object to goals array and clears newGoal', (t) => {

  const newGoal = {
    name: 'I will write such great tests',
    avatar: 'cheetah',
  };
  const initialState = { ...defaultState, newGoal: newGoal, };
  const actionSaveGoal = {
    type: types.SAVE_NEW_GOAL,
    goal: {
      ...newGoal,
      updateCount: 1,
    },
  };
  const newState = reducer(initialState, actionSaveGoal);

  t.equal(newState.goals.length, 1, 'one object in the goals array');
  t.equal(newState.goals[0].name, newGoal.name, 'correct goal in goals array');
  t.equal(newState.goals[0].updateCount, 2, 'update count set to 2');
  t.equal(newState.step, steps.GOALS_LIST, 'current step is goals list');
  t.equal(newState.previousStep, null, 'previous step is null');
  t.deepEqual(newState.newGoal, {}, 'newGoal property is an empty object');
  t.end();
});

tape('test reducer case SELECT_GOAL: current goal is set to selected goal', (t) => {

  const myGoal = { name: 'this is my goal', };
  const initialState = { ...defaultState, goals: [ myGoal, ], };
  const actionSelectGoal = {
    type: types.SELECT_GOAL,
    goal: myGoal,
  };

  t.deepEqual(
    reducer(initialState, actionSelectGoal).currentGoal,
    { ...myGoal, newRating : {}, },
    'current goal is set to myGoal'
  );
  t.end();
});

tape('test reducer step_rate_goal: step and previousStep changed', (t) => {

  const initialState = defaultState;
  const actionStepRateGoal = {
    type: types.STEP_RATE_GOAL,
  };

  t.equal(
    reducer(initialState, actionStepRateGoal).step,
    steps.RATE_GOAL,
    'step rate goal sets correct step'
  );

  t.equal(
    reducer(initialState, actionStepRateGoal).previousStep,
    steps.VIEW_GOAL,
    'step add goal sets correct step'
  );

  t.end();
});

tape('test reducer step_feedback: step and previousStep changed', (t) => {

  const initialState = defaultState;
  const actionStepFeedback = { type: types.STEP_FEEDBACK, };

  t.equal(
    reducer(initialState, actionStepFeedback).step,
    steps.FEEDBACK,
    'step feedback sets correct step'
  );
  t.equal(
    reducer(initialState, actionStepFeedback).previousStep,
    steps.RATE_GOAL,
    'step feedback sets correct previous step'
  );
  t.end();
});

tape('test reducer MOVE_SLIDER: new rating added to currentGoal obj', (t) => {

  const myGoal = { name: 'this is my goal', newRating: {}, };
  const initialState = {
    ...defaultState,
    goals: [ myGoal, ],
    currentGoal: myGoal,
  };

  const expectedState = {
    ...initialState,
    currentGoal: {
      ...initialState.currentGoal,
      newRating: { score: 5, previousScore: undefined, },
    },
  };

  const actionMoveSlider = {
    type: types.MOVE_SLIDER,
    rating: 5,
  };

  const nextState = reducer(initialState, actionMoveSlider);

  t.equal(
    nextState.currentGoal.newRating.score,
    expectedState.currentGoal.newRating.score
  );

  t.equal(
    nextState.currentGoal.newRating.previousScore,
    expectedState.currentGoal.newRating.previousScore
  );

  t.end();
});

tape(`test reducer set previousScore: previous score set to equal current
  score`, (t) => {

  const initialState = {
    ...defaultState,
    currentGoal: {
      newRating: {
        score: 5,
      },
    },
  };

  const actionSetPreviousScore = {
    type: types.SET_PREVIOUS_SCORE,
  };

  t.equal(
    reducer(initialState, actionSetPreviousScore)
      .currentGoal.newRating.previousScore,
    5,
    'previous score set to 5'
  );
  t.end();
});

tape('test saveRating function for reducer save rating', t => {
  const initialState = {
    ...defaultState,
    currentGoal: {
      name: 'Helloo',
      avatar: 'pepper',
      id: 1,
      ratings: [ { score: 6, time: 'today', id: 3, comment: 'comment', }, ],
      newRating: { score: 5, comment: 'comment2', },
    },
  };

  const time = 'today';
  const id = 0;
  const savedRating = saveRating(initialState, time, id);

  t.equal(savedRating.currentGoal.ratings.length, 2,'new rating added to array');
  t.end();
});

tape('test reducer SAVE_GOAL: new rating saved in state', (t) => {

  const myGoal = {
    name: 'this is my goal',
    ratings: [],
    newRating: {
      score: 5,
      comment: 'hello',
    },
  };

  const initialState = {
    ...defaultState,
    goals: [ myGoal, ],
    currentGoal: myGoal,
  };

  const actionsSaveRating = {
    type: types.SAVE_RATING,
    time: 'yesterday',
    id: 0,
  };

  const nextState = reducer(initialState, actionsSaveRating);

  t.deepEqual(nextState.currentGoal.newRating, {}, 'new rating is an empty object');
  t.equal(nextState.currentGoal.ratings.length, 1, 'one rating in ratings array');
  t.equal(nextState.goals[0].name, myGoal.name, 'correct goal added to goals array');
  t.equal(nextState.goals[0].ratings.length, 1, 'new goal has one rating');
  t.equal(nextState.step, steps.VIEW_GOAL, 'step changed to view-goal view');
  t.equal(nextState.previousStep, steps.FEEDBACK, 'step changed to feedback view');
  t.end();
});

tape(`test reducer case STEP_LINE_CHART_DETAIL: sets step to LINE_CHART_DETAIL
  `, (t) => {

  const initialState = {
    ...defaultState,
    step: steps.VIEW_GOAL,
  };

  const actionStepLineChartDetail = {
    type: types.STEP_LINE_CHART_DETAIL,
  };

  const nextState = reducer(initialState, actionStepLineChartDetail);

  t.equal(nextState.step, steps.LINE_CHART_DETAIL);
  t.end();
});

tape('test reducer set pending sync open: pending sync set to open', (t) => {

  const initialState = {
    goals: [{id: 1, pendingSync: {open: false,},},],
  };

  const actionSetPendingSyncOpen = {
    type: types.SET_PENDING_SYNC_OPEN,
    id: 1,
  };
  const nextState = reducer(initialState, actionSetPendingSyncOpen);

  t.equal(nextState.goals[0].pendingSync.open, true, 'pending sync set to open');
  t.end();
});

tape('test reducer UPDATE_SYNC_SUCCESS: sync set to 1 and pending sync set to false', (t) => {

  const initialState = {
    goals: [ {id: 1, syncDBCount: 0, pendingSync: { open: true, }, }, ],
  };

  const actionUpdateSyncSuccess = {
    type: types.UPDATE_SYNC_SUCCESS,
    id: 1,
  };
  const nextState = reducer(initialState, actionUpdateSyncSuccess);

  t.equal(nextState.goals[0].pendingSync.open, false, 'pending sync set to false');
  t.equal(nextState.goals[0].syncDBCount, 1, 'syncDBCount set to 1');
  t.end();
});

tape('test reducer UPDATE_SYNC_SUCCESS: pending sync set to false', (t) => {

  const initialState = {
    goals: [ { id: 1, pendingSync: { open: true, }, }, ],
  };

  const actionUpdateSyncFailure = {
    type: types.UPDATE_SYNC_FAILURE,
    id: 1,
  };
  const nextState = reducer(initialState, actionUpdateSyncFailure);

  t.equal(nextState.goals[0].pendingSync.open, false, 'pendingSync set to false');
  t.end();
});

tape('test reducer RESET_UPDATE_COUNT: updateCount and syncDBCount set to 0', (t) => {

  const initialState = {
    goals: [ {id: 1, updateCount: 1, syncDBCount: 2,}, ],
  };
  const actionResetUpdateCount = {
    type: types.RESET_UPDATE_COUNT,
    id: 1,
  };
  const nextState = reducer(initialState, actionResetUpdateCount);
  t.equal(nextState.goals[0].updateCount, 0, 'update count set to 0');
  t.equal(nextState.goals[0].syncDBCount, 0, 'sync db count set to 0');
  t.end();
});
