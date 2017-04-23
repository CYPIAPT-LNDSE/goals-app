const createTimestamp = date =>
  require('moment')(date).format('YYYY-MM-DD HH:mm:ss');

const getNewGoalData = (goal, userId) =>
  [ goal.id, userId, goal.name, goal.avatar, createTimestamp(goal.date_created), ];

const getRatingData = (rating, { user_id, goal_id, }) =>
  [ rating.id, user_id, goal_id, rating.score, rating.comment, rating.time, ];

const findNewRatings = (oldRatings, newRatings) => {
  const oldRatingsById = oldRatings.map(rating => rating.rating_id);
  const unique = newRatings.filter(({ id, }) => oldRatingsById.indexOf(id) < 0);
  return unique;
};

module.exports = {
  createTimestamp: createTimestamp,
  getNewGoalData: getNewGoalData,
  getRatingData: getRatingData,
  findNewRatings: findNewRatings,
};
