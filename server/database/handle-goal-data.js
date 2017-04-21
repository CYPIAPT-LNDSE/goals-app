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

const getRatings = `
  SELECT *
  from ratings
  WHERE goal_id = $1
`;

const createRating = `
  INSERT into ratings (user_id, goal_id, rating, comment, date_created)
  VALUES ($1, $2, $3, $4, $5);
`;

const updateGoal = (dbGoal, clientGoal, userId, callback) => {

  // check for new ratings
  dbClient.query(getRatings, [ clientGoal.id, ], (getRatingsErr, getRatingsResult) => {
    if (getRatingsErr) {
      return callback('error getting ratings from database');
    }

    if (getRatingsResult.rows.length < clientGoal.ratings.length) {
      // iterate over ratings
      const dbRatingsById = getRatingsResult.rows.map(dbRating => dbRating.rating_id);
      const newRatings = clientGoal.ratings
        .filter(clientRating => dbRatingsById.indexOf(clientRating.id) < 0);

      let count = 0;
      let errorCount = 0;

      newRatings.forEach(rating => {

        const ratingData = [
          userId, clientGoal.id, rating.score, rating.comment, rating.time,
        ];

        dbClient.query(createRating, ratingData, (createRatingErr) => {
          if (createRatingErr) {
            errorCount += 0;
            return;
          }
          count +=1;
          if (count + errorCount === newRatings.length) {
            if (errorCount > 0) return callback(errorCount);
            else return callback(null, clientGoal.id);
          }
        });
      });
      return callback(null, clientGoal.id);
    }
  });
};

module.exports = (goal, user_id, callback) => {
  const goalId = goal.id;

  dbClient.query(getGoal, [ goalId, ], (getGoalErr, getGoalResult) => {
    if (getGoalErr) {
      return callback('error data from database');
    }

    if (getGoalResult.rows.length) {
      // adapt this for new ratings / when we have editing and deleting functionality
      updateGoal(getGoalResult.rows[0], goal, user_id, callback);
      return;
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
