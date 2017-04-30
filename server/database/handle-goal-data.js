/* model */
const addRatings = require('./../model/add-ratings.js');
const addGoal = require('./../model/add-goal.js');
const getGoalDetails = require('./../model/get-goal-details.js');
const getGoalRatings = require('./../model/get-goal-ratings.js');

/* helpers */
const { findNewRatings, } = require('./../helpers/handle-goals.js');

// compares new goal from client with old goal from DB, adds missing ratings to database
const updateGoal = (dbGoal, clientGoal, callback) => {

  // check for new ratings
  getGoalRatings(clientGoal, (err, res) => {
    if (err) return callback(err);

    const goalRatings = res.rows;

    if (goalRatings.length >= clientGoal.ratings.length) {
      return callback(null, [ clientGoal.id, ]);
    }

    const newRatings = findNewRatings(goalRatings, clientGoal.ratings);

    addRatings(newRatings, dbGoal, callback);
  });
};

module.exports = (goal, userId, cb) => {

  const goalId = goal.id;

  getGoalDetails(goalId, (err, res) => {
    if (err) return cb(err);

    if (res.rows.length) {
      // goal already exists, check for new ratings
      // adapt this when we have editing and deleting functionality
      updateGoal(res.rows[0], goal, cb);
      return;
    }

    addGoal(goal, userId, (err, res) => {
      if (err) return cb(err);

      if (goal.ratings.length) {
        addRatings(goal.ratings, { goal_id: goal.id, user_id: userId, }, cb);
        return;
      }

      return cb(null, [ res, ]);
    });
  });
};
