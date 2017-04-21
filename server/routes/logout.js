module.exports = [
  {
    path: '/logout',
    method: 'GET',
    handler: (request, reply) => {
      request.cookieAuth.clear();
      reply.redirect('/login').
      unstate('new-user');
    },
  },
];
