/* database */
const dbClient = require('./../database/db_connection.js');
const queries = require('./../database/queries.js');

/* helpers */
const { getNewGoalData, } = require('./../helpers/handle-goals.js');

module.exports = (goal, userId, cb) => {
  const data = getNewGoalData(goal, userId);
  dbClient.query(queries.insertGoal, data, dbErr => {
    if (dbErr) {
      console.log(dbErr); // eslint-disable-line no-console
      return cb('error adding new goal to database ' + dbErr);
    }
    cb(null, goal.id);
    return;
  });
};
