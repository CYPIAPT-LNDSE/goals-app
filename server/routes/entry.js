module.exports = [
  {
    path: '/entry',
    method: 'GET',
    config: {
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: '/auth',
        },
      },
      handler: (request, reply) => {
        return reply.redirect('/');
      },
    },
  },
];
