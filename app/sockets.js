import io from 'socket.io-client';

import { receiveDbData, setPendingSyncOpen, updateSyncSuccess, updateSyncFailure, resetUpdateCount, } from './actions/general.js';

let socket;

const onUpdateSyncFailure = (store, { id, }, action) => {
  return store.dispatch(action(id));
};

const startSyncGoal = (goal, store) => {

  // set pending sync open to true
  store.dispatch(setPendingSyncOpen(goal));

  const onTimeout = () => {
    onUpdateSyncFailure(store, goal, updateSyncFailure);
  };

  const timer = window.setTimeout(onTimeout, 1000 * 20);

  // sends data to server
  socket.emit('goal', JSON.stringify(goal), (socketErr, socketResponse) => {

    window.clearTimeout(timer);

    if (socketErr) {
      onUpdateSyncFailure(store, goal, updateSyncFailure);
      return;
    }

    store.dispatch(updateSyncSuccess(socketResponse.goal_id));
  });


};

export const socketsMiddleware = (store) =>
  next =>
    action => {
      const result = next(action);
      if (socket) {
        const goals = store.getState().goals;
        if (!window.navigator.onLine || !socket.connected) return;
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
