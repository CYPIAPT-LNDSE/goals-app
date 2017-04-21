const dbClient = require('./db_connection.js');

const getGoal = `
  SELECT *
    from goals
  WHERE goal_id = $1
`;

const addGoal = `
  INSERT into goals (goal_id, user_id, title, icon, date_created)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING goal_id
`;

module.exports = (goal, user_id, callback) => {
  const goalId = goal.id;

  dbClient.query(getGoal, [ goalId, ], (getGoalErr, getGoalResult) => {
    if (getGoalErr) {
      return callback('error data from database');
    }

    if (getGoalResult.rows.length) {
      // adapt this for new ratings / when we have editing and deleting functionality
      return callback(null, 'goal already exists');
    }

    const timestamp = require('moment')(goal.date_created)
      .format('YYYY-MM-DD HH:mm:ss');

    const goalData = [ goal.id, user_id, goal.name, goal.avatar, timestamp, ];

    dbClient.query(addGoal, goalData, (addGoalErr, addGoalResult) => {
      if(addGoalErr) {
        return callback('error adding new goal to database ' + addGoalErr);
      }
      return callback(null, addGoalResult);
    });


  });
};
