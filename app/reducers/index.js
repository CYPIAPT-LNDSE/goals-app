import * as steps from './../steps.js';

const defaultState = {
  goals: [],
  step: steps.GOALS_LIST,
  previousStep: null,
  newGoal: {},
  currentGoal: {},
  comment: "",
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
    case 'STEP_RATE_GOAL':
      return {
        ...state,
        step: steps.RATE_GOAL,
        previousStep: steps.VIEW_GOAL
      }
    case 'STEP_FEEDBACK':
      return {
        ...state,
        step: steps.FEEDBACK,
        previousStep: steps.RATE_GOAL
      }
    case 'SET_PENDING_SYNC_OPEN':
      return {
        ...state,
        goals: state.goals.map((goal) => {
          return action.id === goal.id ? { ...goal, pendingSync: {open: true} } : goal;
        })
      }
    case 'UPDATE_SYNC_SUCCESS':
      return {
        ...state,
        goals: state.goals.map((goal) => {
          const syncDBCount = goal.syncDBCount + 1;
          return action.id === goal.id ? { ...goal, syncDBCount: syncDBCount, pendingSync: {open: false} } : goal;
        })
      }
      case 'UPDATE_SYNC_FAILURE':
        return {
          ...state,
          goals: state.goals.map((goal) => {
            return action.id === goal.id ? { ...goal, pendingSync: {open: false} } : goal;
          })
        }
    case 'RESET_UPDATE_COUNT':
      return {
        ...state,
        goals: state.goals.map((goal) => {
          return action.id === goal.id ? { ...goal, updateCount:0, syncDBCount: 0 } : goal;
        })
      }
    default:
      return state;
  }
};
