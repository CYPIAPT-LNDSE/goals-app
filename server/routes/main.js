module.exports = [
  {
    path: '/',
    method: 'GET',
    config: {
      auth: 'session',
      handler: (request, reply) => {
        reply.file('public/index.html');
      },
    },
  },
];
