module.exports = (goalsArr) => {
  // Add all the goals into one array with empty ratings
  let goals = goalsArr;
  goals.reduce((prev, current) => {
    return prev.goal_id !== current.goal_id ? {
      id: current.goal_id,
      user_id: current.user_id,
      name: current.title,
      avatar: current.icon,
      ratings: [],
    } : {};
  });
  // Iterate over the goals to add ratings
  goalsArr.forEach( (goal) => {
    goals.forEach ((formattedGoal, index) => {
      if(goal.goal_id === goals[index].id){
        goals[index].ratings = goal.rating ? goals[index].ratings.concat([{
          id: goal.rating_id,
          score: goal.rating,
          comment: goal.comment,
          time: goal.date_created,
        },]) : [];
      }
    });
  });
  return JSON.stringify(goals);
};
