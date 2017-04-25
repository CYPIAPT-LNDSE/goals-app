const dbClient = require('./db_connection.js');
const { formatUserGoals, formatUserRatings, } = require('../helpers/format-user-data');

const getGoalsQuery = `
  SELECT goals.user_id, goals.goal_id, goals.title, goals.icon
  FROM goals
  WHERE user_id=$1 AND goals.deleted=false
`;

const getRatingsQuery = `
  SELECT
    ratings.rating_id,
    ratings.rating,
    ratings.comment,
    ratings.date_created
  FROM ratings
  WHERE user_id=$1 AND goal_id=$2
  ORDER BY ratings.date_created DESC
`;

const getRatings = (user_id, goals, finalCallBack) => {
  let count = 1;
  goals.forEach( (goal) => {
    dbClient.query(getRatingsQuery, [ user_id, goal.id, ],
    (err, ratingsRes) => {
      if (err) finalCallBack('');
      goal.ratings = (ratingsRes.rows)
        ? formatUserRatings(ratingsRes.rows)
        : [];
      if (count === goals.length) {
        finalCallBack(JSON.stringify(goals));
      } else {
        count += 1;
      }
    });
  });
};

const getUserData = (user_id, finalCallBack) => {
  dbClient.query(getGoalsQuery, [ user_id, ], (err, res) => {
    const formattedGoals = formatUserGoals(res.rows);
    const goalsWithRatings = getRatings(user_id, formattedGoals, finalCallBack);
    return JSON.stringify(goalsWithRatings);
  });
};

module.exports = getUserData;
