const querystring = require('querystring');
const url = require('url');
const fetch = require('request');
const getUserDb = require('./../database/get-user.js');

module.exports = {
  path: '/hello',
  method: 'GET',
  config: {
    auth: false,
    handler: (request, reply) => {

      const requestParams = request.url.path.split('?')[1];
      const code = querystring.parse(requestParams).code;
      const params = {
        client_id: process.env.FB_APP_ID,
        redirect_uri: process.env.BASE_URL + '/hello',
        client_secret: process.env.FB_CLIENT_SECRET,
        code: code,
      };

      const fbAuthUrl = url.format({
        protocol: 'https:',
        hostname: 'graph.facebook.com',
        pathname: 'v2.8/oauth/access_token',
        search: querystring.stringify(params),
      });

      fetch(fbAuthUrl, (fbAuthErr, _, fbAuthBody) => {
        if (fbAuthErr) {
          throw new Error(fbAuthErr);
        }

        const fbAccessToken = JSON.parse(fbAuthBody).access_token;

        if (!fbAccessToken) {
          return reply('problem verifying user with Facebook, no access token');
        }

        const fbGraphUrl = `https://graph.facebook.com/me?access_token=${fbAccessToken}`;

        fetch(fbGraphUrl, (fbGraphErr, _, fbGraphBody) => {
          if (fbGraphErr) {
            throw new Error (fbGraphErr);
          }

          const fbUserData = JSON.parse(fbGraphBody);
          const fbUserId = fbUserData.id;

          getUserDb(fbUserId, (getUserDbErr, userId) => {
            if (getUserDbErr) {
              return reply(getUserDbErr + 'error getting user from database');
            }
            request.cookieAuth.set({ id: userId, });
            reply.redirect('/').
            state('new-user', fbUserId.toString());
          });
        });
      });
    },
  },
};
