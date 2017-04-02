module.exports = [{
  path: '/',
  method: 'GET',
  handler: (request, reply) => {
    const userCookie = request.state.userCookie || '';
    if(userCookie) {
      reply.file('public/index.html');
    } else {
      reply.redirect('/login');
    }
  },
}]
