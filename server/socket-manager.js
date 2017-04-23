const cookieParser = require('cookie');
const iron = require('iron');

const socketManager = (socket) => {
  let id = '';
  const cookie = cookieParser.parse(socket.request.headers.cookie)['grow-user'];
  iron.unseal(cookie, process.env.COOKIE_PASSWORD, iron.defaults, (err, decodedCookie) => {
    id = decodedCookie.id;
  });
};

module.exports = socketManager;
