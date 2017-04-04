module.exports = [
  {
    path: '/',
    method: 'GET',
    handler: (request, reply) => {
      if (!request.auth.isAuthenticated) {
        return reply.redirect('/login');
      }
      reply.file('public/index.html');
    },
  },
];
