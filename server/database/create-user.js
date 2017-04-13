const dbClient = require('./db_connection.js');

const query = `
INSERT INTO users (username)
VALUES ($1)
RETURNING user_id;`;

module.exports = (facebookId, callback) => {
  dbClient.connect((connectionErr) => {
    if (connectionErr) {
      throw new Error (connectionErr);
    }

    dbClient.query(query, [facebookId,], (queryErr, result) => {
      if (queryErr) {
        console.log('query error');
        console.log(queryErr);
        callback('error adding user to database');
      } else {
        console.log('no error here');
        callback(null, result);
      }
      dbClient.end((dbEndErr) => {
        if (dbEndErr) throw new Error (dbEndErr);
      });
    });
  });
};
