const dbClient = require('./db_connection.js');
const uuidV1 = require('uuid/v1');

const findUser = `
SELECT * from users
WHERE username = $1;`;

const newId = uuidV1();

const createUser = `
INSERT into users (user_id, username)
VALUES ($1, $2)
RETURNING user_id;`;

module.exports = (facebookId, callback) => {

  dbClient.query(findUser, [ facebookId, ], (getErr, result) => {
    if (getErr) {
      return callback('database error while retrieving user details');
    }

    if (result.rows.length) {
      return callback(null, result.rows[0].user_id);
    }

    dbClient.query(createUser, [ newId, facebookId, ], (insertErr, newUser) => {
      if (insertErr) {
        return callback('unable to create new user');
      }

      callback(null, newUser);
    });
  });
};
