const socketio = require('socket.io');
const socketManager = require('./socket-manager.js');
const cookieParser = require('cookie');
const iron = require('iron');

const createSocket = (listener) => {
  const io = socketio.listen(listener);

  io.set('authorization', (handshakeData, accept) => {

    if (handshakeData.headers.cookie) {
      const cookie = cookieParser.parse(handshakeData.headers.cookie)['grow-user'];
      iron.unseal(cookie, process.env.COOKIE_PASSWORD, iron.defaults, (err, unsealed) => {
        console.log('cookie: ',unsealed);
        // unsealed has the same content as obj
      });
      // console.log('cookie ', cookie);
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
