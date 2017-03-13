// import actions here
import stepAddGoal from './../actions/goals-list.js';

// steps
import * as steps from './../steps.js';

const defaultState = {
  // app state here
  goals: [
    {
      id: 0,
      name: 'Eat more pizza',
      created: 1488984810654,
      avatar: 'sprout',
      currentRating: 7,
      ratings: [],
    },
    {
      id: 1,
      name: 'Drink more champagne',
      created: 1488984810658,
      avatar: 'pumpkin',
      currentRating: 8,
      ratings: [],
    },
    {
      id: 2,
      name: 'Be cool',
      created: 1488984810658,
      avatar: 'pepper',
      currentRating: 10,
      ratings: [],
    },
  ],
  step: steps.GOALS_LIST,
  previousStep: null,
  newGoal: {
    name: '',
    avatar: ''
  },
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
        ...state, newGoal: {}, goals: state.goals.concat([action.goal]),
      }
    default:
      return state;
  }
};
