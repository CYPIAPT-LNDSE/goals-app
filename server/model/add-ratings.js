const async = require('async');

/* database */
const dbClient = require('./../database/db_connection.js');
const queries = require('./../database/queries.js');

/* helpers */
const { getRatingData, } = require('./../helpers/handle-goals.js');

const insertRating = (rating, goal, cb) => {
  const data = getRatingData(rating, goal);
  dbClient.query(queries.insertRating, data, (dbErr) => {
    if (dbErr) {
      console.log(dbErr); // eslint-disable-line
      return cb(dbErr);
    }
    cb(null);
  });
};

module.exports = (ratings, goal, finalCallback) => {
  let tasks = [];
  ratings.forEach(rating => {
    const nextTask = (cb) => {
      insertRating(rating, goal, (err) => {
        if (err) {
          return cb(err);
        }
        cb(null, goal.goal_id);
      });
    };
    tasks = tasks.concat(nextTask);
  });
  async.parallel(tasks, finalCallback);
};
