const dbClient = require('./db_connection.js');
const formatUserData = require('./format-user-data');

const getGoals = `SELECT goals.user_id, goals.goal_id, goals.title, goals.icon,
ratings.rating_id, ratings.rating, ratings.comment, ratings.date_created
FROM (goals LEFT OUTER JOIN ratings ON goals.goal_id = ratings.goal_id)
WHERE goals.user_id=$1 AND goals.deleted=false
GROUP BY goals.goal_id, ratings.rating_id
ORDER BY goals.goal_id, ratings.rating ASC`;


const getUserData = (id, callback) => {
  dbClient.query(getGoals, [ id, ], (goalsErr, goalsRes) => {
    if(goalsErr) {
      callback('');
    }
    callback(formatUserData(goalsRes.rows));
  });
};

module.exports = getUserData;
