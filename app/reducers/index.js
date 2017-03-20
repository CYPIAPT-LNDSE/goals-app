import * as steps from './../steps.js';

const defaultState = {
  goals: [{name: "Helloo", avatar: "pepper", id: 1,
    ratings: [{score: 6, time:"today", id: 3},
    {score: 5, time:"two days ago", id: 4},
    {score: 8, time:"last week", id: 5},
    {score: 9, time:"last week", id: 5}]
  }],
  step: steps.GOALS_LIST,
  previousStep: null,
  newGoal: {},
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
    default:
      return state;
  }
};
