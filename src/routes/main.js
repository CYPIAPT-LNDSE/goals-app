module.exports = [{
  path: '/',
  method: 'GET',
  handler: (request, reply) => {
    // const userCookie = request.state.userCookie || '';
     if (request.auth.isAuthenticated) {
       console.log("yay authenticated");
       reply.file('public/index.html');
     } else {
       console.log("need to login");
       reply.redirect('/login');
     }
  },
}];
