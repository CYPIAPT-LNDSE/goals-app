const includesId = (goals, id) => {
  let flag = false;
  goals.forEach((goal) => {
    if (goal.id === id) flag = true;
  });
  return flag;
};

const removeDuplicates = (goals) => {
  let filteredGoals = [];
  goals.forEach((goal) => {
    if(!includesId(filteredGoals, goal.id)) {
      filteredGoals.push(goal);
    }
  });
  return filteredGoals;
};

const formatGoalsArray = (goals) => {
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

const addRatings = (formattedGoals, goalsArray) => {
  goalsArray.forEach( (goal) => {
    formattedGoals.forEach ((formattedGoal, index) => {
      if(goal.goal_id === formattedGoals[index].id){
        formattedGoals[index].ratings =
        goal.rating ? formattedGoals[index].ratings.concat([{
          id: goal.rating_id,
          score: goal.rating,
          comment: goal.comment,
          time: goal.date_created,
        },]) : [];
      }
    });
  });
  return formattedGoals;
};

module.exports = (goalsArray) => {
  let goals = removeDuplicates(formatGoalsArray(goalsArray));
  goals = addRatings(goals, goalsArray);
  return JSON.stringify(goals);
};
