/* database */
const dbClient = require('./../database/db_connection.js');
const queries = require('./../database/queries.js');

module.exports = (goal, cb) => {
  dbClient.query(queries.deleteGoal, [ goal.id, ], (dbDeleteGoalErr, dbDeletedGoalId) => {

    if (dbDeleteGoalErr) {
      return cb('error deleting goal in database ' + dbDeleteGoalErr);
    }
    
    cb(null, dbDeletedGoalId);
  });
};
