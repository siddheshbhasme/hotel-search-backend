const tracer = require('tracer');
const httpContext = require('express-http-context');

const getLogger = () => {
  return tracer.colorConsole({
    format: [
      '{{timestamp}} {{title}} {{requestId}} {{path}} Fn-{{method}} Ln-{{line}} Col-{{pos}} | {{message}}',
      {
        error:
          '{{timestamp}} {{title}} {{requestId}} {{path}} Fn-{{method}} Ln-{{line}} Col-{{pos}} | {{message}} \nCall Stack:\n{{stack}}'
        // error format
      }
    ],
    dateformat: 'UTC:yyyy-mm-dd HH:MM:ss,l Z',
    preprocess: function(data) {
      data.requestId = httpContext.get('requestId') || '00000';
      data.title = data.title.toUpperCase();
    }
  });
};
module.exports.getLogger = getLogger;
