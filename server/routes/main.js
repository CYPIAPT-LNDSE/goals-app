module.exports = [
  {
    path: '/',
    method: 'GET',
    handler: (request, reply) => {
      reply.file('public/index.html');
    },
  },
];
