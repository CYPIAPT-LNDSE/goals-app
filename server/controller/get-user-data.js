/* model */
const { getUserGoals, getRatingsAllGoals, } = require('./../model/get-user-goals.js');

/* helpers */
const { formatUserGoals, formatUserRatings, } = require('../helpers/format-user-data');

module.exports = (userId, cb) => {
  getUserGoals(userId, (err, res) => {
    if (err) return cb(err);
    const formattedGoals = formatUserGoals(res.rows);
    getRatingsAllGoals(userId, formattedGoals, (ratingsErr, ratingsRes) => {
      if (ratingsErr) return cb(ratingsErr);
      const finalResult = ratingsRes.map(goal =>
        Object.assign({}, goal, {
          ratings: goal.ratings.length
            ? formatUserRatings(goal.ratings)
            : [],
        })
      );
      cb(null, JSON.stringify(finalResult));
    });
  });
};
