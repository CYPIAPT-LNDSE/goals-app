module.exports = (goalsArr) => {
  let goals = [];
  let previousGoalId = null;
  // Add all the goals into one array with empty ratings
  goalsArr.forEach ((goal) => {
    if(previousGoalId !== goal.goal_id){
      goals = goals.concat([{
        id: goal.goal_id,
        user_id: goal.user_id,
        name: goal.title,
        avatar: goal.icon,
        ratings: [],
      },]);
      previousGoalId = goal.goal_id;
    }
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
