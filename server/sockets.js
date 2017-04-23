const socketio = require('socket.io');
const socketManager = require('./socket-manager.js');
const cookieParser = require('cookie');

const createSocket = (listener) => {
  const io = socketio.listen(listener);

  io.set('authorization', (handshakeData, accept) => {

    if (handshakeData.headers.cookie) {
      const cookie = cookieParser.parse(handshakeData.headers.cookie)['grow-user'];
      console.log('cookie ', cookie);
    } else {
      return accept('No cookie transmitted.', false);
    }

    accept(null, true);
  });

  io.on('connection', socketManager);
};

module.exports = {
  createSocket: createSocket,
};
