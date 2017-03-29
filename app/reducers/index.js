import * as steps from './../steps.js';
import * as types from './../action_types.js';

const defaultState = {
  goals: [],
  step: steps.GOALS_LIST,
  previousStep: null,
  newGoal: {},
  currentGoal: {},
};

export const mapWithId = ({ goals, }, { id, }, fn) => {
  return goals.map(elem =>
  elem.id === id
    ? fn(elem)
    : elem);
};

export const saveRating = (state, time, id) => {

  const newRating = constructNewRating(state, time, id);
  const currentGoal = addRatingToCurrentGoal(state, newRating);
  const goals = mapWithId(state, currentGoal, () => increaseUpdateCount(currentGoal));

  return {
    ...state,
    goals: goals,
    currentGoal: currentGoal,
  };
};

export const increaseUpdateCount = goal => {
  return { ...goal, updateCount: (goal.updateCount + 1 || 1), };
};

export const constructNewRating = ({ currentGoal, }, time, id) => {
  return {
    score: currentGoal.newRating.score,
    id: id,
    time: time,
    comment: currentGoal. newRating.comment,
  };
};

export const addGoalToArray = (state, { goal, }, fn = goal => goal) => {
  return state.goals.concat([ fn(goal), ]);
};

export const addRatingToCurrentGoal = ({ currentGoal, }, newRating) => {
  return {
    ...currentGoal,
    ratings: [ newRating, ].concat(currentGoal.ratings),
    newRating: {},
  };
};

export default (state = defaultState, action) => {
  switch(action.type) {
  case types.STEP_ADD_GOAL:
    return {
      ...state,
      step: steps.ADD_GOAL,
      previousStep: steps.GOALS_LIST,
    };
  case types.INPUT_GOAL:
    return {
      ...state, newGoal: {
        ...state.newGoal, name: action.input,
      },
    };
  case types.SELECT_AVATAR:
    return {
      ...state, newGoal: {
        ...state.newGoal, avatar: action.avatar,
      },
    };
  case types.SAVE_NEW_GOAL:
    return {
      ...state,
      goals: addGoalToArray(state, action, increaseUpdateCount),
      step: steps.GOALS_LIST,
      previousStep: null,
      newGoal: {},
    };
  case types.SELECT_GOAL:
    return {
      ...state,
      step: steps.VIEW_GOAL,
      previousStep: steps.GOALS_LIST,
      currentGoal: {
        ...action.goal,
        newRating: {},
      },
    };
  case types.STEP_RATE_GOAL:
    return {
      ...state,
      step: steps.RATE_GOAL,
      previousStep: steps.VIEW_GOAL,
    };
  case types.MOVE_SLIDER:
    return {
      ...state,
      currentGoal: {
        ...state.currentGoal,
        newRating: {
          ...state.currentGoal.newRating,
          score: action.rating,
        },
      },
    };
  case types.STEP_FEEDBACK:
    return {
      ...state,
      step: steps.FEEDBACK,
      previousStep: steps.RATE_GOAL,
    };
  case types.INPUT_FEEDBACK:
    return {
      ...state,
      currentGoal: {
        ...state.currentGoal,
        newRating: {
          ...state.currentGoal.newRating,
          comment: action.input,
        },
      },
    };
  case types.SAVE_RATING:
    return {
      ...saveRating(state, action.time, action.id),
      step: steps.VIEW_GOAL,
      previousStep: steps.FEEDBACK,
    };
  case types.SET_PENDING_SYNC_OPEN:
    return {
      ...state,
      goals: mapWithId(state, action, (goal) => {
        return { ...goal, pendingSync: { open: true, }, };
      }),
    };
  case types.UPDATE_SYNC_SUCCESS:
    return {
      ...state,
      goals: mapWithId(state, action, (goal) => {
        return {
          ...goal,
          syncDBCount: goal.syncDBCount + 1,
          pendingSync: { open: false, },
        };
      }),
    };
  case types.UPDATE_SYNC_FAILURE:
    return {
      ...state,
      goals: mapWithId(state, action, (goal) => {
        return { ...goal, pendingSync: { open: false, }, };
      }),
    };
  case types.RESET_UPDATE_COUNT:
    return {
      ...state,
      goals: mapWithId(state, action, (goal) => {
        return { ...goal, updateCount:0, syncDBCount: 0, };
      }),
    };
  default:
    return state;
  }
};
