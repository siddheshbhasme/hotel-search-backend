const tracer = require('tracer');
const httpContext = require('express-http-context');
const {
  LOGGER_DEFAULT_FORMAT,
  LOGGER_ERROR_FORMAT,
  LOGGER_DATE_FORMAT
} = require('../constants');

const getLogger = () => {
  return tracer.colorConsole({
    format: [
      LOGGER_DEFAULT_FORMAT,
      {
        error: LOGGER_ERROR_FORMAT
      }
    ],
    dateformat: LOGGER_DATE_FORMAT,
    preprocess: function(data) {
      data.requestId = httpContext.get('requestId') || '00000';
      data.title = data.title.toUpperCase();
    }
  });
};
module.exports.getLogger = getLogger;
