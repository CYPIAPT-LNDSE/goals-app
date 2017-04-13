const getUserData = '../getUserData.js';

module.exports = [
  {
    path: '/hello',
    method: ['GET',],
    config: {
      auth: {
        strategy: 'facebook',
        mode: 'try',
      },
      handler: (request, reply) => {
        if (!request.auth.isAuthenticated) {
          return reply('Auth failed due to: ' + request.auth.error.message).code(401);
        } else {
          const id = request.auth.credentials.profile.id;
          request.cookieAuth.set({user: id, });
          getUserData(id);
          reply.file('public/index.html');
        }
      },
    },
  },
];
