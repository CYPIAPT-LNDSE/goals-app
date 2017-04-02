module.exports = [{
  path: '/login',
  method: 'GET',
  handler: (request,reply) => { reply.file('public/login.html'); },
}];
