import * as steps from './../steps.js';
import * as types from './../action_types.js';

const defaultState = {
  user: {
    isAuthenticated: false,
    authPending: false,
    id: null,
  },
  goals: [],
  step: steps.GOALS_LIST,
  previousStep: null,
  menu: false,
  visibleEditDelete: false,
  newGoal: {},
  currentGoal: {},
  setScreenHeight: null,
};

export const backStep = (state) => {
  const step = state.step;
  const previousStep = state.previousStep;

  switch(step) {
  case steps.ADD_GOAL:
    return {
      ...state,
      step: steps.GOALS_LIST,
      previousStep: null,
    };
  case steps.VIEW_GOAL:
    return {
      ...state,
      step: steps.GOALS_LIST,
      previousStep: null,
      currentGoal: {},
    };
  case steps.RATE_GOAL:
    return {
      ...state,
      step: previousStep,
      previousStep: null,
    };
  case steps.FEEDBACK:
    return {
      ...state,
      step: steps.RATE_GOAL,
      previousStep: previousStep,
      currentGoal: {
        ...state.currentGoal,
        newRating: {
          ...state.currentGoal.newRating,
          previousScore: 0,
        },
      },
    };
  case steps.LINE_CHART_DETAIL:
    return {
      ...state,
      step: steps.VIEW_GOAL,
    };
  default:
    return state;
  }
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

export const mapWithId = ({ goals, }, { id, }, fn) => {
  return goals.map(elem =>
  elem.id === id
    ? fn(elem)
    : elem);
};

export const increaseUpdateCount = goal => {
  return { ...goal, updateCount: (goal.updateCount + 1 || 1), };
};

export const constructNewRating = ({ currentGoal, }, time, id) => {
  return {
    score: currentGoal.newRating.score,
    id: id,
    time: time,
    comment: currentGoal.newRating.comment,
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

export const selectRatingById = (id, arr) =>
  arr.find(rating => rating.id === id) || null;

export default (state = defaultState, action) => {
  switch(action.type) {
  case types.TOGGLE_MENU:
    return {
      ...state,
      menu: !state.menu,
    };
  case types.NAV_CLICK:
    return {
      ...state,
      step: steps.GOALS_LIST,
      previousStep: null,
      currentGoal: {},
    };
  case types.BACK_BUTTON_CLICK:
    return backStep(state);
  case types.BORDER_GOAL_CLICK:
    return {
      ...state,
      visibleEditDelete: !state.visibleEditDelete,
    };
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
  case types.TRIGGER_CONFIRMATION:
    return {
      ...state,
      newGoal: {
        ...state.newGoal,
        confirmation: true,
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
      step: action.goal.ratings && action.goal.ratings.length
        ? steps.VIEW_GOAL
        : steps.RATE_GOAL,
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
          previousScore: state.currentGoal.newRating.score,
        },
      },
    };
  case types.SET_PREVIOUS_SCORE:
    return {
      ...state,
      currentGoal: {
        ...state.currentGoal,
        newRating: {
          ...state.currentGoal.newRating,
          previousScore: state.currentGoal.newRating.score,
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
  case types.STEP_LINE_CHART_DETAIL:
    return {
      ...state,
      step: steps.LINE_CHART_DETAIL,
    };
  case types.SELECT_RATING:
    return {
      ...state,
      currentGoal: {
        ...state.currentGoal,
        ratingSelected: selectRatingById(action.rating, state.currentGoal.ratings),
      },
    };
  case types.SET_AUTH_PENDING:
    return {
      ...state,
      user: {
        ...state.user,
        authPending: true,
      },
    };
  case types.AUTH_SUCCESS:
    return {
      ...state,
      user: {
        isAuthenticated: true,
        id: action.user_id,
        authPending: false,
      },
    };
  case types.AUTH_FAILURE:
    return {
      ...state,
      user: {
        isAuthenticated: false,
        id: null,
        authPending: false,
      },
    };
  case types.SET_PENDING_SYNC_OPEN:
    return {
      ...state,
      goals: state.goals.map((goal) => {
        return action.id === goal.id
        ? { ...goal, pendingSync: { open: true, }, }
        : goal;
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
        return { ...goal, updateCount: 0, syncDBCount: 0, };
      }),
    };
  case types.RECEIVE_DB_DATA:
    return {
      ...state,
      goals: action.goals,
    };
  case types.SET_SCREEN_HEIGHT:
    return {
      ...state,
      setScreenHeight: action.height,
    };
  default:
    return state;
  }
};
