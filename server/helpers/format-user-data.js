const formatUserGoals = (goals) => {
  return goals.map((goal) => {
    return {
      id: goal.goal_id,
      user_id: goal.user_id,
      name: goal.title,
      avatar: goal.icon,
      ratings: [],
      created: goal.date_created,
    };
  });
};

const formatUserRatings = (ratings) =>
  ratings.map((rating) => ({
    id: rating.rating_id,
    score: rating.rating,
    time: rating.date_created,
    comment: rating.comment,
  }));

module.exports = {
  formatUserGoals: formatUserGoals,
  formatUserRatings: formatUserRatings,
};
