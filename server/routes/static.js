const path = require('path');

module.exports = [
  {
    path: '/{file*}',
    method: 'GET',
    config: {
      auth: false,
      handler: {
        directory: {
          path: path.join(__dirname, '../../public'),
          defaultExtension: 'html',
        },
      },
    },
  },
];
