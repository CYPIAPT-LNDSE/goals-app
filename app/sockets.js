import io from 'socket.io-client';

import { receiveDbData, setPendingSyncOpen, updateSyncSuccess, updateSyncFailure, resetUpdateCount, } from './actions/general.js';

let socket;

const startSyncGoal = (goal, store) => {

  // sends data to server
  socket.emit('goal', JSON.stringify(goal), (socketErr, socketResponse) => {
    if (socketErr) {
      console.log(socketErr);
      return store.dispatch(updateSyncFailure(goal.id));
    }
    store.dispatch(updateSyncSuccess(socketResponse));
  });

  // set pending sync open to true
  store.dispatch(setPendingSyncOpen(goal));
};

export const socketsMiddleware = (store) =>
  next =>
    action => {
      const result = next(action);
      if (socket) {
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

  socket.on('userdata', (data) => {
    store.dispatch(receiveDbData(data));
  });
};
