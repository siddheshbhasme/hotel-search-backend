const httpContext = require('express-http-context');
const short = require('short-uuid')();

const setRequestId = (req, res, next) => {
  httpContext.set('requestId', short.new());
  next();
};

const setupRequestIdetifier = app => {
  app.use(httpContext.middleware);
  app.use(setRequestId);
};

module.exports = setupRequestIdetifier;
