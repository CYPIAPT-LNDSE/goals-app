const dbClient = require('./db_connection.js');

const getGoals = `
SELECT title, rating, icon, date_created
FROM goals
WHERE user_id = $1 AND deleted = false;`;

const getUserData = (id) => {
  //get user goals

  dbClient.query(getGoals, [ id, ], (goalsErr, goalsRes) => {
    if(goalsErr) {
      console.log(goalsErr);
      return '';
    }
    const goals = goalsRes.rows;
    console.log(goalsRes.rows);
  });
  // for each goal get the ratings
  return id;
};

module.exports = getUserData;
