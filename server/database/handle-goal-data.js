const dbClient = require('./db_connection.js');

/* queries */
const queries = require('./queries.js');
const addRatings = require('./add-ratings.js');

/* helper functions */
const { getNewGoalData, findNewRatings, } = require('./../helpers/handle-goals.js');

// compares new goal from client with old goal from DB, adds missing ratings to database
const updateGoal = (dbGoal, clientGoal, callback) => {

  // check for new ratings
  dbClient.query(queries.getRatings, [ clientGoal.id, ], (dbRatingsErr, dbRatingsRes) => {

    if (dbRatingsErr) {
      return callback('error getting ratings from database');
    }

    const dbRatings = dbRatingsRes.rows;

    if (dbRatings.length >= clientGoal.ratings.length) {
      return callback(null, clientGoal.id);
    }

    const newRatings = findNewRatings(dbRatings, clientGoal.ratings);

    addRatings(newRatings, dbGoal, callback);
  });
};

module.exports = (goal, user_id, callback) => {

  const goalId = goal.id;

  dbClient.query(queries.getGoal, [ goalId, ], (getGoalErr, getGoalResult) => {
    if (getGoalErr) {
      return callback('error getting data from database');
    }

    if (getGoalResult.rows.length) {
      // goal already exists, check for new ratings
      // adapt this when we have editing and deleting functionality
      updateGoal(getGoalResult.rows[0], goal, callback);
      return;
    }

    // still to do: adapt to also handle ratings for these new goals!
    dbClient.query(queries.insertGoal, getNewGoalData(goal, user_id), (addGoalErr) => {
      if (addGoalErr) {
        return callback('error adding new goal to database ' + addGoalErr);
      }
      return callback(null, goal.id);
    });
  });
};
