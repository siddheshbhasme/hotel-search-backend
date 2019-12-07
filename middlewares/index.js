const setupSwagger = require('./swagger');
const setupRequestIdentifier = require('./requestIdentifier');
module.exports = app => {
  setupSwagger(app);
  setupRequestIdentifier(app);
};
