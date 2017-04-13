const dbClient = require('./db_connection.js');

const findUser = `
  SELECT * from users
  WHERE username = $1;`;

const createUser = `
  INSERT into users (username)
  VALUES ($1)
  RETURNING user_id;`;

module.exports = (facebookId, callback) => {

  dbClient.connect((err) => {
    if (err) throw new Error (err);

    dbClient.query(findUser, [ facebookId, ], (getErr, result) => {
      if (getErr) {
        return callback('database error while retrieving user details');
      }

      if (result.rows.length) {
        dbClient.end((err) => {
          if (err) throw err;

          callback(null, result.rows[0].user_id);
        });
      } else {
        dbClient.query(createUser, [ facebookId, ], (insertErr, newUser) => {
          if (insertErr) {
            callback('unable to create new user');
          }

          dbClient.end((err) => {
            if (err) throw err;

            callback(null, newUser);
          });
        });
      }
    });
  });
};
