const async = require('async');

/* model */
const deleteGoalDb = require('./../model/delete-goal.js');
const getGoalDetails = require('./../model/get-goal-details.js');
const editGoalDb = require('./../model/edit-goal.js');
const addRatings = require('./../model/add-ratings.js');
const addGoal = require('./../model/add-goal.js');
const getGoalRatings = require('./../model/get-goal-ratings.js');

/* helpers */
const { findNewRatings, } = require('./../helpers/handle-goals.js');

/* waterfall steps */
// if goal deleted, delete goal --> implement later
// OTHERWISE
// 1. get details of goal from DB
// 2. if goal edited on client, change name --> implement later
// 3. get existing ratings for goal from DB
// 4. add any missing ratings
// 5. if goal doesn't exist yet, add goal to DB
// 6. if newly added goal already has new ratings, add those ratings

const handleDeleted = (goal, cb) => {
  deleteGoalDb(goal, (err) => {
    if (err) return cb(err);
    cb(null, goal);
  });
};

const handleEdits = (data, cb) => {
  if (!data.clientGoal.edited) return cb(null, data);
  editGoalDb(data.clientGoal, (err) => {
    if (err) return cb(err);
    cb(null, data);
  });
};

const goalRatings = (data, cb) => {
  if (!data.dbGoal) return cb(null, data);
  getGoalRatings(data.clientGoal, (err, res) => {
    if (err) return cb(err);
    const returnData = Object.assign({}, data, { dbRatings: res.rows, });
    cb(null, returnData);
  });
};

const addRatingsToGoal = (data, cb) => {
  if (!data.dbGoal) return cb(null, data);
  const newRatings = findNewRatings(data.dbRatings, data.clientGoal.ratings);
  addRatings(newRatings, data.dbGoal, (err) => {
    if (err) return cb(err);
    cb(null, data);
  });
};

const addGoalIfNotExists = (data, cb) => {
  if (data.dbGoal) return cb(null, data);
  addGoal(data.clientGoal, data.userId, (err) => {
    if (err) return cb(err);
    cb(null, data);
  });
};

const addNewRatings = (data, cb) => {
  if (data.dbGoal) return cb(null, data);
  if (!data.clientGoal.ratings.length) return cb(null, data);
  addRatings(data.clientGoal.ratings, { goal_id: data.clientGoal.id, user_id: data.userId, }, (err) => {
    if (err) return cb(err);
    cb(null, data);
  });
};


module.exports = (goal, userId, finalCallback) => {

  if (goal.deleted) {
    handleDeleted(goal, (err) => {
      if (err) return finalCallback(err);
      finalCallback(null, goal.id);
    });
  }

  const goalDetails = (cb) => {
    getGoalDetails(goal.id, (err, res) => {
      if (err) return cb(err);
      const details = res.rows.length ? res.rows[0] : null;
      const returnData = {
        clientGoal: goal,
        dbGoal: details,
        userId: userId,
      };
      cb(null, returnData);
    });
  };

  const tasks = [ goalDetails, handleEdits, goalRatings, addRatingsToGoal,
    addGoalIfNotExists, addNewRatings, ];

  async.waterfall(tasks, (err, data) => {
    if (err) finalCallback(err);
    finalCallback(null, data.clientGoal.id);
  });
};
