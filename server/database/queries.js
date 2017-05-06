/* users */

const getUserById = `
  SELECT * from users
  WHERE user_id = $1
`;

const insertUser = `
  INSERT into users (user_id)
  VALUES ($1)
  RETURNING user_id
`;

/* goals */

const getGoalById = `
  SELECT *
  from goals
  WHERE goal_id = $1
`;

const getGoalsByUserId = `
  SELECT
    goals.user_id,
    goals.goal_id,
    goals.title,
    goals.icon,
    goals.date_created
  FROM goals
  WHERE user_id=$1 AND goals.deleted=false
  ORDER BY goals.date_created ASC
`;

const insertGoal = `
  INSERT into goals (goal_id, user_id, title, icon, date_created)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING goal_id
`;

/* ratings */

const getRatingsByGoalId = `
  SELECT
    ratings.rating_id,
    ratings.rating,
    ratings.comment,
    ratings.date_created
  FROM ratings
  WHERE goal_id=$1
  ORDER BY ratings.date_created DESC
`;

const insertRating = `
  INSERT into ratings (rating_id, user_id, goal_id, rating, comment, date_created)
  VALUES ($1, $2, $3, $4, $5, $6);
`;

module.exports = {
  getUserById: getUserById,
  insertUser: insertUser,
  getGoalById: getGoalById,
  getGoalsByUserId: getGoalsByUserId,
  insertGoal: insertGoal,
  getRatingsByGoalId: getRatingsByGoalId,
  insertRating: insertRating,
};
