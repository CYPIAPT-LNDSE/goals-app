const getGoal = `
  SELECT *
  FROM goals
  WHERE goal_id = $1
`;

const insertGoal = `
  INSERT INTO goals (goal_id, user_id, title, icon, date_created)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING goal_id
`;

const getRatings = `
  SELECT *
  FROM ratings
  WHERE goal_id = $1
`;

const insertRating = `
  INSERT INTO ratings (rating_id, user_id, goal_id, rating, comment, date_created)
  VALUES ($1, $2, $3, $4, $5, $6);
`;

const deleteGoal = `
  UPDATE goals
  SET deleted = true
  WHERE goal_id = $1
  RETURNING goal_id
`;

const editGoal = `
  UPDATE goals
  SET title = $1
  WHERE goal_id = $2
  RETURNING goal_id
`;

module.exports = {
  getGoal: getGoal,
  insertGoal: insertGoal,
  getRatings: getRatings,
  insertRating: insertRating,
  deleteGoal: deleteGoal,
  editGoal: editGoal,
};
