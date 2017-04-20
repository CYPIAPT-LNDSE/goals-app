const dbClient = require('./db_connection.js');

const getGoals = `SELECT goals.user_id, goals.goal_id, goals.title,
goals.icon, ratings.rating, ratings.comment, ratings.date_created
FROM (goals LEFT OUTER JOIN ratings ON goals.goal_id = ratings.goal_id)
WHERE goals.user_id=$1 AND goals.deleted=false
GROUP BY goals.goal_id, ratings.rating_id`;


const getUserData = (id) => {

  dbClient.query(getGoals, [ id, ], (goalsErr, goalsRes) => {
    if(goalsErr) {
      console.log(goalsErr);
      return '';
    }
    console.log(goalsRes.rows);
  });

  return id;
};

module.exports = getUserData;
