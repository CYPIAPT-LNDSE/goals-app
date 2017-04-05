module.exports = [
  {
    path: '/',
    method: 'GET',
    config: {
      auth: {
        strategy: 'facebook',
        mode: 'try',
      },
    },
    handler: (request, reply) => {
      if (!request.auth.isAuthenticated) {
        return reply.redirect('/login');
      }
      reply.file('public/index.html');
    },
  },
];
