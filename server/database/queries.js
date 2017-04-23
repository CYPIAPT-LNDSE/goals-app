export const getGoal = `
  SELECT *
  from goals
  WHERE goal_id = $1
`;

export const insertGoal = `
  INSERT into goals (goal_id, user_id, title, icon, date_created)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING goal_id
`;

export const getRatings = `
  SELECT *
  from ratings
  WHERE goal_id = $1
`;

export const insertRating = `
  INSERT into ratings (user_id, goal_id, rating, comment, date_created)
  VALUES ($1, $2, $3, $4, $5);
`;
