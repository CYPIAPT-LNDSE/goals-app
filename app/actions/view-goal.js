import { createAction, } from 'redux-actions';

// action types
import * as types from '../action_types.js';

export const stepRateGoal = createAction(types.STEP_RATE_GOAL);

export const stepLineChartDetail = createAction(types.STEP_LINE_CHART_DETAIL);

export const onSelectRating = rating => ({
  type: types.SELECT_RATING,
  rating: rating,
});
