const querystring = require('querystring');
const url = require('url');
const fetch = require('request');
const getUser = require('./../database/get-user.js');

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

      const remoteUrl = url.format({
        protocol: 'https:',
        hostname: 'graph.facebook.com',
        pathname: 'v2.8/oauth/access_token',
        search: querystring.stringify(params),
      });

      fetch(remoteUrl, (err, response, body) => {
        if (err) { throw new Error(err); }

        const accessToken = JSON.parse(body).access_token;
        if (!accessToken) {
          return reply('problem verifying user with Facebook, no access token');
        }

        const graphUrl = 'https://graph.facebook.com/me?access_token=' + accessToken;
        fetch(graphUrl, (graphErr, _, graphBody) => {
          if (graphErr) throw new Error (graphErr);

          const userData = JSON.parse(graphBody);
          const fb_id = userData.id;

          getUser(fb_id, (getUserErr, userId) => {
            if (getUserErr) return reply(getUserErr + 'error getting user from database');

            request.cookieAuth.set({ id: userId, });
            reply.redirect('/');
          });
        });
      });
    },
  },
};
