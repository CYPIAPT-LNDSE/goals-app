module.exports = [{
  path: '/login',
  method: ['GET', 'POST'],
  config: {
    auth: {
      strategy: 'facebook',
      mode: 'try',
    },
    handler: (request, reply) => {
      if (!request.auth.isAuthenticated) {
        return reply('Auth failed due to: ' + request.auth.error.message).code(401);
      } else {
        console.log(JSON.stringify(request.auth.credentials, null, 4));
        request.cookieAuth.set({id: request.auth.credentials.profile.id});
        reply.redirect('/');
      }
    },
  },
}];
