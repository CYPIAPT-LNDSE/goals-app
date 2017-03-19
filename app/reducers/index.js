// import actions here
import stepAddGoal from './../actions/goals-list.js';

// steps
import * as steps from './../steps.js';

const defaultState = {
  // app state here
  goals: [],
  step: steps.GOALS_LIST,
  previousStep: null,
  newGoal: {
    name: '',
    avatar: ''
  },
  currentGoal: {},
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'STEP_ADD_GOAL':
      return {
        ...state,
        step: steps.ADD_GOAL,
        previousStep: steps.GOALS_LIST,
      }
    case 'INPUT_GOAL':
      return {
        ...state, newGoal: {
          ...state.newGoal, name: action.input,
        },
      }
    case 'SELECT_AVATAR':
      return {
        ...state, newGoal: {
          ...state.newGoal, avatar: action.avatar,
        },
      }
    case 'SAVE_NEW_GOAL':
      return {
        ...state,
         goals: state.goals.concat([action.goal]),
        step: steps.GOALS_LIST,
        previousStep: null,
        newGoal: {},
      }
    case 'SELECT_GOAL':
      return {
        ...state,
        step: steps.VIEW_GOAL,
        previousStep: steps.GOALS_LIST,
        currentGoal: action.goal,
      }
    case 'RATE_GOAL':
      return {
        ...state,
        step: steps.RATE_GOAL,
        previousStep: steps.VIEW_GOAL
      }
    default:
      return state;
  }
};
