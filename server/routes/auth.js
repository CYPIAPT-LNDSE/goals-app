const querystring = require('querystring');
const url = require('url');

module.exports = {
  path: '/auth',
  method: 'GET',
  config: {
    auth: false,
    handler: (request, reply) => {

      const params = {
        client_id: process.env.FB_APP_ID,
        redirect_uri: process.env.BASE_URL + '/hello',
      };

      const remoteUrl = url.format({
        protocol: 'https:',
        hostname: 'www.facebook.com',
        pathname: 'v2.8/dialog/oauth',
        search: querystring.stringify(params),
      });

      return reply.redirect(remoteUrl);
    },
  },
};
