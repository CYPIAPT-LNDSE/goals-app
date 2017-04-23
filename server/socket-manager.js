const cookieParser = require('cookie');
const iron = require('iron');
const getUserData = require('./database/get-user-data.js');

const socketManager = (socket) => {
  let id = '';
  const cookie = cookieParser.parse(socket.request.headers.cookie)['grow-user'];
  iron.unseal(cookie, process.env.COOKIE_PASSWORD, iron.defaults, (err, decodedCookie) => {
    id = decodedCookie.id;
  });
  getUserData(id, (res) => {
    socket.emit('userdata', res);
  });
};

module.exports = socketManager;
