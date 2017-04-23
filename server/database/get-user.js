const dbClient = require('./db_connection.js');

const findUser = `
SELECT * from users
WHERE user_id = $1;`;

const createUser = `
INSERT into users (user_id)
VALUES ($1)
RETURNING user_id;`;

module.exports = (facebookId, callback) => {

  dbClient.query(findUser, [ facebookId, ], (getErr, result) => {
    if (getErr) {
      return callback('database error while retrieving user details');
    }

    if (result.rows.length) {
      return callback(null, result.rows[0].user_id);
    }

    dbClient.query(createUser, [ facebookId, ], (insertErr, newUser) => {
      if (insertErr) {
        return callback('unable to create new user');
      }

      callback(null, newUser);
    });
  });
};
