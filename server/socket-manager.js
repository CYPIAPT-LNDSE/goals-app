const cookieParser = require('cookie');
const iron = require('iron');

const authenticateCookie = (socket, callback) => {
  const cookie = cookieParser.parse(socket.request.headers.cookie)['grow-user'];
  iron.unseal(cookie, process.env.COOKIE_PASSWORD, iron.defaults, (err, decodedCookie) => {
    if(err) callback(err);
    callback(null, decodedCookie.id);
  });
};

const socketManager = (socket) => {
  socket.on('authenticate', () => {
    authenticateCookie(socket, (err, data) => {
      if(err) socket.emit('User not authenticated');
      socket.emit('userdata', data);
      // handles socket events
    });
  });
};

module.exports = socketManager;
