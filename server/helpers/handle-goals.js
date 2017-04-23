const createTimestamp = date =>
  require('moment')(date).format('YYYY-MM-DD HH:mm:ss');

const getNewGoalData = (goal, userId) =>
  [ goal.id, userId, goal.name, goal.avatar, createTimestamp(goal.date_created), ];

const getRatingData = (rating, { user_id, goal_id, }) =>
  [ user_id, goal_id, rating.score, rating.comment, rating.time, ];

const findNewRatings = (oldRatings, newRatings) => {
  const oldRatingsById = oldRatings.map(rating => rating.rating_id);
  return newRatings.filter(rating => oldRatingsById.indexOf(rating) < 0);
};

module.exports = {
  createTimestamp: createTimestamp,
  getNewGoalData: getNewGoalData,
  getRatingData: getRatingData,
  findNewRatings: findNewRatings,
};
