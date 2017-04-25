module.exports = (goals) => {
  return goals.map((goal) => {
    return {
      id: goal.goal_id,
      user_id: goal.user_id,
      name: goal.title,
      avatar: goal.icon,
      ratings: [],
    };
  });
};
