import { createAction } from 'redux-actions';

// action types
import { STEP_ADD_GOAL } from '../action_types.js'

const stepAddGoal = createAction(STEP_ADD_GOAL);

export default stepAddGoal;
