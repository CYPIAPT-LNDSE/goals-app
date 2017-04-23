const cookieParser = require('cookie');
const iron = require('iron');

/* database */
const getUserData = require('./database/get-user-data.js');
const handleGoalData = require('./database/handle-goal-data.js');

const socketManager = (socket) => {
  let id = '';
  const cookie = cookieParser.parse(socket.request.headers.cookie)['grow-user'];
  iron.unseal(cookie, process.env.COOKIE_PASSWORD, iron.defaults, (err, decodedCookie) => {
    id = decodedCookie.id;
    getUserData(id, (data) => {
      socket.emit('userdata', data);
    });
  });

  socket.on('goal', (data, clientCallback) => {
    const goalData = JSON.parse(data);

    handleGoalData(goalData, id, (dbErr, dbResult) => {
      if (dbErr) {
        clientCallback(true);
      } else {
        clientCallback(null, dbResult);
      }
    });
  });
};

module.exports = socketManager;
