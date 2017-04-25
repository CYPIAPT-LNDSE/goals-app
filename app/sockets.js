import io from 'socket.io-client';

import {
  receiveDbData, setPendingSyncOpen, updateSyncSuccess, updateSyncFailure, resetUpdateCount, authSuccess, } from './actions/general.js';
import * as types from './action_types.js';let socket;

const startSyncGoal = (goal, store) => {

  // sends data to server
  socket.emit('goal', JSON.stringify(goal), (socketErr, socketResponse) => {
    if (socketErr) {
      return store.dispatch(updateSyncFailure(goal.id));
    }

    store.dispatch(updateSyncSuccess(socketResponse.goal_id));
  });

  // set pending sync open to true
  store.dispatch(setPendingSyncOpen(goal));
};

export const socketsMiddleware = (store) =>
  next =>
    action => {
      const result = next(action);
      if (socket) {
        if (action.type === types.SET_AUTH_PENDING) {
          socket.emit('authenticate', null, (socketErr, user_id) => {
            if (socketErr) {
              return store.dispatch(authFailure());
            }
            return store.dispatch(authSuccess(user_id));
          });
        }
        const goals = store.getState().goals;
        if (!window.navigator.onLine) return;
        goals.forEach((goal) => {
          if (goal.pendingSync && goal.pendingSync.open) return;
          if (goal.updateCount > 0 && goal.updateCount === goal.syncDBCount) {
            return store.dispatch(resetUpdateCount(goal.id));
          }
          if (goal.updateCount === goal.syncDBCount) return;
          startSyncGoal(goal, store);
        });
      }
      return result;
    };

export default (store) => {
  socket = io();

  socket.on('userData', (data) => {
    if (store.getState().user.isAuthenticated) {
      store.dispatch(receiveDbData(data));
    }
  });
};
