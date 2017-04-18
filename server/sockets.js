const socketio = require('socket.io');
const socketManager = require('./socket-manager.js');
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
    socket.emit('userdata', id);
  });
};

module.exports = {
  createSocket: createSocket,
};
