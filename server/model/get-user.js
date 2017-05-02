/* database */
const dbClient = require('./../database/db_connection.js');
const queries = require('./../database/queries.js');

module.exports = (userId, callback) => {

  dbClient.query(queries.getUserById, [ userId, ], (getErr, result) => {
    if (getErr) {
      return callback('database error while retrieving user details');
    }

    if (result.rows.length) {
      return callback(null, result.rows[0].user_id);
    }

    dbClient.query(queries.insertUser, [ userId, ], (insertErr, newUser) => {
      if (insertErr) {
        return callback('unable to create new user');
      }

      callback(null, newUser);
    });
  });
};
