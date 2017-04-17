const socketio = require('socket.io');
const socketManager = require('./socket-manager.js');
const cookieParser = require('cookie');

const createSocket = (listener) => {
  const io = socketio.listen(listener);
  // io.use(cookieParser);
  io.set('authorization', (handshakeData, accept) => {

    if (handshakeData.headers.cookie) {
      console.log('parsed: ', cookieParser.parse(handshakeData.headers.cookie)['new-user']);
      // console.log(cookieParser.signedCookies(handshakeData.headers.cookie, process.env.COOKIE_PASSWORD));
      const cookie = handshakeData.headers.cookie['new-user'];
      console.log(cookie);
    } else {
      console.log('no cookie');
      return accept('No cookie transmitted.', false);
    }

    accept(null, true);
  });

  io.on('connection', socketManager);
};

module.exports = {
  createSocket: createSocket,
};
