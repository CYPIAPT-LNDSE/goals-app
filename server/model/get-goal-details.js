/* database */
const dbClient = require('./../database/db_connection.js');
const queries = require('./../database/queries.js');

module.exports = (goalId, cb) => {
  dbClient.query(queries.getGoalById, [ goalId, ], (dbErr, dbRes) => {
    if (dbErr) {
      console.log("Error retreiving goal from database, ", getGoalErr); // eslint-disable-line
      return cb('error getting data from database');
    }
    cb(null, dbRes);
    return;
  });
};
