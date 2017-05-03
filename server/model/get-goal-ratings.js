/* database */
const dbClient = require('./../database/db_connection.js');
const queries = require('./../database/queries.js');

module.exports = (goal, cb) => {

  dbClient.query(queries.getRatingsByGoalId, [ goal.id, ], (dbErr, dbRes) => {
    if (dbErr) {
      console.log("Error retreiving ratings from database, ", dbErr); // eslint-disable-line
      return cb(dbErr);
    }
    cb(null, dbRes);
    return;
  });
};
