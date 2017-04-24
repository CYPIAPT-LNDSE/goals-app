const cookieParser = require('cookie');
const iron = require('iron');
const getUserData = require('./database/get-user-data.js');

const authenticateCookie = (socket, callback) => {
  const cookie = cookieParser.parse(socket.request.headers.cookie)['grow-user'];
  iron.unseal(cookie, process.env.COOKIE_PASSWORD, iron.defaults, (err, decodedCookie) => {
    if(err) callback(err);
    callback(null, decodedCookie.id);
  });
};

const socketManager = (socket) => {
  socket.on('authenticate', () => {
    authenticateCookie(socket, (err, id) => {
      if(err) socket.emit('User not authenticated');
      getUserData(id, (data) => {
        socket.emit('userdata', data);
      });
    });
  });
};

module.exports = socketManager;
