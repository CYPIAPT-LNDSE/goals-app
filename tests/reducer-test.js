const tape = require('tape');

const types = require('./../app/action_types.js');
const steps = require('./../app/steps.js');

/* functions to be tested */
const reducer = require('./../app/reducers/index.js').default;
const saveRating = require('./../app/reducers/index.js').saveRating;
const increaseUpdateCount = require('./../app/reducers/index.js').increaseUpdateCount;
const addGoalToArray = require('./../app/reducers/index.js').addGoalToArray;

const defaultState = {
  goals: [],
  step: steps.GOALS_LIST,
  previousStep: null,
  newGoal: {},
  currentGoal: null,
};

tape(`increaseUpdateCount function takes an object and increments the
  updateCount value by one`, (t) => {
    const goal1 = {
      name: 'my best goal',
      updateCount: 0,
    };
    const goal2 = {
      name: 'my new goal',
    };

    t.equal(increaseUpdateCount(goal1).updateCount, 1, `count increased by 1`);
    t.equal(increaseUpdateCount(goal2).updateCount, 1, `count set to 1 if undefined`);
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
      }
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
  const input = 'I will test test t'
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
    }
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
  const initialState = { ...defaultState, goals: [ myGoal, ] };
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
  const actionStepFeedback = {
    type: types.STEP_FEEDBACK,
  };

  t.equal(
    reducer(initialState, actionStepFeedback).step,
    steps.FEEDBACK,
    'step feedback sets correct step'
  );
  t.equal(
    reducer(initialState, actionStepFeedback).previousStep,
    steps.RATE_GOAL,
    'step feedback sets correct step'
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

  const actionMoveSlider = {
    type: types.MOVE_SLIDER,
    rating: 5,
  };

  const nextState = reducer(initialState, actionMoveSlider);

  t.equal(nextState.currentGoal.newRating.score, 5, 'rating 5 added to current state');
  t.end();
});

tape('test saveRating function for reducer save rating', t => {
  const initialState = {
    ...defaultState,
    currentGoal: {
      name: 'Helloo',
      avatar: 'pepper',
      id: 1,
      ratings: [ { score: 6, time: 'today', id: 3, comment: 'comment' }, ],
      newRating: { score: 5, comment: 'comment2', }
    },
  };

  const time = 'today';
  const id = 0;
  const savedRating = saveRating(initialState, time, id);

  t.equal(savedRating.currentGoal.ratings.length, 2,`new rating added to array`);
  t.end();
});

tape('test reducer SAVE_GOAL: new rating saved in state', (t) => {

  const myGoal = {
    name: 'this is my goal',
    ratings: [],
    newRating: {
      score: 5,
      comment: 'hello'
    }
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
  }

  const nextState = reducer(initialState, actionsSaveRating);

  t.deepEqual(nextState.currentGoal.newRating, {}, 'new rating is an empty object');
  t.equal(nextState.currentGoal.ratings.length, 1, 'one rating in ratings array');
  t.equal(nextState.goals[0].name, myGoal.name, 'correct goal added to goals array');
  t.equal(nextState.goals[0].ratings.length, 1, 'new goal has one rating');
  t.equal(nextState.step, steps.VIEW_GOAL, 'step changed to view-goal view');
  t.equal(nextState.previousStep, steps.FEEDBACK, 'step changed to feedback view');

  t.end();
});

tape('test reducer set pending sync open: pending sync set to open', (t) => {

  const initialState = {
    goals: [{id: 1, pendingSync: {open: false}}]
  };
  const actionSetPendingSyncOpen = {
    type: types.SET_PENDING_SYNC_OPEN,
    id: 1
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
    id: 1
  };
  const nextState = reducer(initialState, actionUpdateSyncSuccess);

  t.equal(nextState.goals[0].pendingSync.open, false, 'pending sync set to false');
  t.equal(nextState.goals[0].syncDBCount, 1, 'syncDBCount set to 1');
  t.end();
});

tape('test reducer UPDATE_SYNC_SUCCESS: pending sync set to false', (t) => {

  const initialState = {
    goals: [ { id: 1, pendingSync: { open: true, } }, ],
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
    goals: [ {id: 1, updateCount: 1, syncDBCount: 2}, ],
  };
  const newState = {
    goals: [ {id: 1, updateCount:0, syncDBCount: 0}, ],
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
