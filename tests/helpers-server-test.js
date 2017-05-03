const tape = require('tape');

const helpers = require('./../server/helpers/handle-goals.js');

tape('create timestamp takes a date object and returns a valid timestamp', (t) => {
  const date = new Date(2017, 1);
  t.equal(helpers.createTimestamp(date), '2017-02-01 00:00:00', 'creates valid timestamp');
  t.end();
});

tape('getNewGoalData formats data about new goal for insertion into DB', (t) => {
  const goalData = {
    id: '101',
    name: 'my shiny new goal',
    avatar: 'potato',
    date_created: new Date(2017, 3),
  };

  const userId = '99';

  const expected = [
    '101', '99', 'my shiny new goal', 'potato', '2017-04-01 00:00:00',
  ];

  t.deepEqual(
    helpers.getNewGoalData(goalData, userId),
    expected,
    'data correctly formatted'
  );
  t.end();
});

tape('getRatingData formats data about new rating for insertion into DB', (t) => {
  const ratingData = {
    id: 44,
    score: 7,
    comment: 'exciting comment',
    time: new Date(2017, 4),
    otherThing: 'thing',
  };

  const goalData = {
    user_id: '001',
    goal_id: '007',
  };

  const expected = [ 44, '001', '007', 7, 'exciting comment', new Date(2017, 4), ];

  t.deepEqual(
    helpers.getRatingData(ratingData, goalData),
    expected,
    'data correctly formatted'
  );
  t.end();
});

tape(`findNewRatings takes 2 arrays of ratings and finds the unique ratings
  from the second array`, (t) => {

  const rating1 = {
    rating_id: 2,
    score: 5,
    comment: 'comment 1',
  };

  const rating2 = {
    rating_id: 3,
    score: 6,
    comment: 'comment 2',
  };

  const rating3 = {
    id: 4,
    score: 8,
    comment: 'comment 3',
  };

  const rating1new = Object.assign({}, rating1, { id: 2, });
  const rating2new = Object.assign({}, rating2, { id: 3, });

  const arr1 = [ rating1, rating2, ];
  const arr2 = [ rating1new, rating2new, rating3, ];

  t.deepEqual(helpers.findNewRatings(arr1, arr2), [ rating3, ], 'finds new rating');
  t.end();
});
