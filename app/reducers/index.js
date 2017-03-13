// import actions here
import stepAddGoal from './../actions/goals-list.js';

const defaultState = {
  // app state here
  goals: [
    {
      id: 0,
      name: 'Eat more pizza',
      created: 1488984810654,
      avatar: 'sprout',
      status: 0,
      currentRating: 7,
      ratings: [],
    },
    {
      id: 1,
      name: 'Drink more champagne',
      created: 1488984810658,
      avatar: 'pumpkin',
      status: 0,
      currentRating: 8,
      ratings: [],
    },
    {
      id: 2,
      name: 'Be cool',
      created: 1488984810658,
      avatar: 'pepper',
      status: 0,
      currentRating: 10,
      ratings: [],
    },
  ],
  step: 'GOALS_LIST',
  previousStep: null,
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'STEP_ADD_GOAL':
      return Object.assign({}, state, {
        step: 'ADD_GOAL',
        previousStep: 'GOALS_LIST',
      });
    default:
      return state;
  }
};
