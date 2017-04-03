import { createAction, } from 'redux-actions';

// action types
import * as types from '../action_types.js';

export const onNavClick = createAction(types.NAV_CLICK);
export const onBackButtonClick = createAction(types.BACK_BUTTON_CLICK);
export const toggleMenu = createAction(types.TOGGLE_MENU);
