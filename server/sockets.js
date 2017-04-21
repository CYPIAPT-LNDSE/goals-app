const socketio = require('socket.io');
const getUserData = require('./database/get-user-data.js');
const cookieParser = require('cookie');

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
  });
};

module.exports = {
  createSocket: createSocket,
};
