const dbClient = require('./db_connection.js');

const query = `
  SELECT * from users
  WHERE username = $1`;

module.exports = (facebookId, callback) => {
  dbClient.connect((err) => {
    if (err) throw new Error (err);
    dbClient.query(query, [facebookId,], (err, result) => {
      if (err) {
        callback('database error while retrieving user details');
      }
      dbClient.end((err) => {
        if (err) throw err;
        callback(null, result.rows);
      });
    });
  });
};
