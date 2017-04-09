module.exports = {
  user: [
  {user_id: 1, facebook_id: 1123327952, date_created: '2017-04-05 14:34:14',},
  ],
  ratings: [
    {rating_id:1, user_id:1, goal_id:1, rating:7, comment:'no comment',
      date_created:'2017-04-05 14:34:14',},
    {rating_id:2, user_id:1, goal_id:1, rating:5, comment:'no comment',
      date_created:'2017-04-05 14:34:14',},
  ],
  goals: [
    {id: 1, user_id: 1, name: 'Goal example 1', rating: 5, avatar: 'pepper' ,
      deleted: 'false', date_created: '2017-04-05 14:34:14',},
    {id: 2, user_id: 1, name: 'Goal example 2', rating: 4, avatar: 'flower',
      deleted: 'false', date_created: '2017-04-05 14:34:14',},
  ],
};
