const socketio = require('socket.io');
const cookieParser = require('cookie');

/* database */
const getUserData = require('./database/get-user-data.js');
const handleGoalData = require('./database/handle-goal-data.js');

const createSocket = (listener) => {
  const io = socketio.listen(listener);
  let id = '';
  io.set('authorization', (handshakeData, accept) => {

    if (handshakeData.headers.cookie) {
      id = cookieParser.parse(handshakeData.headers.cookie)['new-user'];
    } else {
      return accept('No cookie transmitted.', false);
    }

    accept(null, true);
  });

  io.on('connection', (socket) => {
    getUserData(id, (res) => {
      socket.emit('userdata', res);
    });

    socket.on('goal', (data, clientCallback) => {
      const goalData = JSON.parse(data);
      handleGoalData(goalData, id, (err, result) => {
        if (err) {
          clientCallback(true);
        } else if (result === 'goal already exists') {
          return;
        } else {
          clientCallback(null, result.rows[0]);
        }
      });
    });
  });
};

module.exports = {
  createSocket: createSocket,
};
