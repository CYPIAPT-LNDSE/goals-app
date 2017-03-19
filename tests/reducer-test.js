const tape = require('tape');

const reducer = require('./../app/reducers/index.js').default;
const types = require('./../app/action_types.js');
const steps = require('./../app/steps.js');

const defaultState = {
  goals: [],
  step: steps.GOALS_LIST,
  previousStep: null,
  newGoal: {},
  currentGoal: null,
};

tape('test reducer step_add_goal: step and previousStep changed', (t) => {

  const initialState = defaultState;
  const actionStepAddGoal = {
    type: types.STEP_ADD_GOAL,
  };

  t.equal(
    reducer(initialState, actionStepAddGoal).step,
    steps.ADD_GOAL,
    "step add goal sets correct step"
  );
  t.equal(
    reducer(initialState, actionStepAddGoal).previousStep,
    steps.GOALS_LIST,
    "step add goal sets correct step"
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
    goal: newGoal,
  };
  const newState = reducer(initialState, actionSaveGoal);

  t.equal(newState.goals.length, 1, 'one object in the goals array');
  t.deepEqual(newState.goals[0], newGoal, 'correct goal in goals array');
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
    myGoal,
    'current goal is set to myGoal'
  );
  t.end();
});
