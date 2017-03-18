const reducer = require('./../app/reducers/index.js').default;
const types = require('./../app/action_types.js');
const steps = require('./../app/steps.js');

const tape = require('tape');

const defaultState = {
  goals: [],
  step: steps.GOALS_LIST,
  previousStep: null,
  newGoal: {
    name: '',
    avatar: '',
  },
  currentGoal: null,
};

tape('test redux reducer steps', (t) => {

  const initialState = defaultState;

  const actionStepAddGoal = {
    type: types.STEP_ADD_GOAL,
  };

  t.equal(reducer(initialState, actionStepAddGoal).step, steps.ADD_GOAL, "step add goal sets correct step");
  t.equal(reducer(initialState, actionStepAddGoal).previousStep, steps.GOALS_LIST, "step add goal sets correct step");

  t.end();
});

tape('test redux input_goal', (t) => {

  const initialState = { ...defaultState, step: steps.ADD_GOAL, };

  const input = 'I will test test t'

  const actionInputGoal = {
    type: types.INPUT_GOAL,
    input: input,
  };

  t.equal(reducer(initialState, actionInputGoal).newGoal.name, input, 'input value added to state');
  t.end();
})
