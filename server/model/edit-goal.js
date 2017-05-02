/* database */
const dbClient = require('./../database/db_connection.js');
const queries = require('./../database/queries.js');

module.exports = (goal, cb) => {
  dbClient.query(queries.editGoal, [ goal.name, goal.id, ], (dbEditedGoalErr,
     dbEditedGoalId) => {

    if (dbEditedGoalErr) {
      return cb('error getting ratings from database ' + dbEditedGoalErr);
    }

    cb(null, dbEditedGoalId);
  });
};
