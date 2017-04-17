const socketio = require('socket.io');
const socketManager = require('./socket-manager.js');
const cookieParser = require('cookie-parser');

const createSocket = (listener) => {
  const io = socketio.listen(listener);
  io.set('authorization', (handshakeData, accept) => {
    const cookie = JSON.parse(handshakeData.headers.cookie);

    console.log("handshake? ", cookie);
  });
  io.on('connection', socketManager);
};

module.exports = {
  createSocket: createSocket,
};
