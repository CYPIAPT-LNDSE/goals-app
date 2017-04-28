const cookieParser = require('cookie');
const iron = require('iron');

/* database */
const getUserData = require('./database/get-user-data.js');
const handleGoalData = require('./database/handle-goal-data.js');

const authenticateCookie = (socket, callback) => {
  const cookie = cookieParser.parse(socket.request.headers.cookie)['grow-user'];
  iron.unseal(cookie, process.env.COOKIE_PASSWORD, iron.defaults, (err, decodedCookie) => {
    if (err) callback(err);
    callback(null, decodedCookie.id);
  });
};

const socketManager = (socket) => {
  let user_id = '';

  socket.on('authenticate', (_, clientCallback) => {
    authenticateCookie(socket, (err, id) => {
      if (err) {
        console.log(err);
        return clientCallback('auth error');
      }
      //lets client know authentication was successful
      user_id = id;
      clientCallback(null, user_id);

      getUserData(id, (err, data) => {
        if (err) {
          console.log(err);
          data = '';
        }
        socket.emit('userData', data);
      });

      socket.on('goal', (data, clientCallback) => {
        console.log('goal was changed');
        const goalData = JSON.parse(data);

        handleGoalData(goalData, user_id, (dbErr, dbResult) => {
          if (err) {
            clientCallback(dbErr);
          } else {
            clientCallback(null, dbResult);
          }
        });
      });

    });
  });
};

module.exports = socketManager;
