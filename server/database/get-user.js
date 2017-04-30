const dbClient = require('./db_connection.js');
const queries = require('./queries.js');

module.exports = (facebookId, callback) => {

  dbClient.query(queries.getUserById, [ facebookId, ], (getErr, result) => {
    if (getErr) {
      return callback('database error while retrieving user details');
    }

    if (result.rows.length) {
      return callback(null, result.rows[0].user_id);
    }

    dbClient.query(queries.insertUser, [ facebookId, ], (insertErr, newUser) => {
      if (insertErr) {
        return callback('unable to create new user');
      }

      callback(null, newUser);
    });
  });
};
