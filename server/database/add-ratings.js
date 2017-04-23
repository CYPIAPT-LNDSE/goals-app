const dbClient = require('./db_connection.js');

const { insertRating, } = require('./queries.js');
const { getRatingData, } = require('./../helpers/handle-goals.js');

module.exports = (ratings, dbGoal, finalCallback) => {
  let count = 0;
  let errCount = 0;

  ratings.forEach(rating => {
    dbClient.query(insertRating, getRatingData(rating, dbGoal), (createRatingErr) => {
      if (createRatingErr) {
        console.log(createRatingErr);
        errCount += 1;
      } else {
        count += 1;
      }
      if (errCount + count === ratings.length) {
        if (errCount > 0) return finalCallback('failed to add some ratings to database');
        return finalCallback(null, dbGoal.goal_id);
      }
    });
  });
};
