const cookieParser = require('cookie');
const iron = require('iron');

/* controller */
const receiveGoalData = require('./../controller/receive-goal-data.js');
const getUserData = require('./../controller/get-user-data.js');

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
        console.log(err); // eslint-disable-line
        return clientCallback('auth error');
      }
      //lets client know authentication was successful
      user_id = id;
      clientCallback(null, user_id);

      getUserData(id, (err, data) => {
        if (err) {
          console.log(err); // eslint-disable-line
          data = '';
        }
        socket.emit('userData', data);
      });

      socket.on('goal', (data, clientCallback) => {
        const goalData = JSON.parse(data);

        receiveGoalData(goalData, user_id, (err, res) => {
          // result is goal id of updated goal
          if (err) return clientCallback(err);
          // success: goal id send back to client
          clientCallback(null, res);
        });
      });
    });
  });
};

module.exports = socketManager;
