const async = require('async');

/* database */
const dbClient = require('./../database/db_connection.js');
const queries = require('./../database/queries.js');

/* model */
const getGoalRatings = require('./get-goal-ratings.js');

const getUserGoals = (userId, cb) => {
  dbClient.query(queries.getGoalsByUserId, [ userId, ], (dbErr, dbRes) => {
    if (dbErr) {
      console.log(dbErr); // eslint-disable-line
      return cb(dbErr);
    }
    cb(null, dbRes);
  });
};

const getRatingsAllGoals = (userId, goals, finalCallback) => {

  let tasks = [];

  goals.forEach(goal => {
    const nextTask = cb => {
      getGoalRatings(goal, (err, res) => {
        if (err) return cb(err);
        const goalWithRatings = Object.assign({}, goal, { ratings: res.rows, });
        cb(null, goalWithRatings);
      });
    };
    tasks = tasks.concat(nextTask);
  });

  async.parallel(tasks, finalCallback);
};

module.exports = {
  getUserGoals: getUserGoals,
  getRatingsAllGoals: getRatingsAllGoals,
};
