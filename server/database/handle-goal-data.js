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

const deleteGoal = (goal, callback) => {
  dbClient.query(queries.deleteGoal, [ goal.id, ], (dbDeleteGoalErr, dbDeletedGoalId) => {

    if (dbDeleteGoalErr) {
      return callback('error deleting goal in database');
    }

    return callback(null, dbDeletedGoalId);
  });
};

const editGoal = (goal, callback) => {
  dbClient.query(queries.editGoal, [ goal.name, goal.id, ], (dbEditedGoalErr,
    dbEditedGoalId) => {

    if (dbEditedGoalErr) {
      return callback('error getting ratings from database');
    }

    return callback(null, dbEditedGoalId);
  });
};

module.exports = (goal, user_id, callback) => {

  const goalId = goal.id;

  dbClient.query(queries.getGoal, [ goalId, ], (getGoalErr, getGoalResult) => {
    if (getGoalErr) {
      console.log(getGoalErr);
      return callback('error getting data from database');
    }

    if (getGoalResult.rows.length) {
      // goal already exists, check for new ratings
      // adapt this when we have editing and deleting functionality
      const oldGoal = getGoalResult.rows[0];
      if (goal.deleted) {
        deleteGoal(goal, callback);
      } else if (goal.edited) {
        editGoal(goal, callback);
      } else {
        updateGoal(oldGoal, goal, callback);
      }
      return;
    }


    dbClient.query(queries.insertGoal, getNewGoalData(goal, user_id), (addGoalErr) => {
      if (addGoalErr) {
        return callback('error adding new goal to database ' + addGoalErr);
      }

      if (goal.ratings.length) {
        addRatings(goal.ratings, { goal_id: goal.id, user_id: user_id, }, (callback));
        return;
      }

      return callback(null, goal.id);
    });
  });
};
