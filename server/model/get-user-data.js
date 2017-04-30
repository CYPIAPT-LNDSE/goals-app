/* database */
const dbClient = require('./../database/db_connection.js');
const queries = require('./../database/queries.js');

/* helpers */
const { formatUserGoals, formatUserRatings, } = require('../helpers/format-user-data');

const getRatings = (user_id, goals, finalCallBack) => {
  let count = 1;
  goals.forEach((goal) => {
    dbClient.query(queries.getRatingsByGoalId, [ goal.id, ],
    (err, ratingsRes) => {
      if (err) finalCallBack(err);
      goal.ratings = (ratingsRes.rows)
        ? formatUserRatings(ratingsRes.rows)
        : [];
      if (count === goals.length) {
        finalCallBack(null, JSON.stringify(goals));
      } else {
        count += 1;
      }
    });
  });
};

const getUserData = (user_id, finalCallBack) => {
  dbClient.query(queries.getGoalsByUserId, [ user_id, ], (err, res) => {
    if (err) {
      console.log(err); // eslint-disable-line
    }
    const formattedGoals = formatUserGoals(res.rows);
    const goalsWithRatings = getRatings(user_id, formattedGoals, finalCallBack);
    return JSON.stringify(goalsWithRatings);
  });
};

module.exports = getUserData;
