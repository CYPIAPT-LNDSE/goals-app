const path = require('path');

module.exports = [{
   path: '/{file*}',
   method: 'GET',
   handler: {
     directory: { path: path.join(__dirname, '../../public'), },
   },
}];
