module.exports = {
  SWAGGER_DEFINITION_TITLE: 'Hotel Search Backend APIs',
  SWAGGER_DEFINITION_VERSION: '1.0.0',
  LOGGER_DEFAULT_FORMAT:
    '{{timestamp}} {{title}} {{requestId}} {{path}} Fn-{{method}} Ln-{{line}} Col-{{pos}} | {{message}}',
  LOGGER_ERROR_FORMAT:
    '{{timestamp}} {{title}} {{requestId}} {{path}} Fn-{{method}} Ln-{{line}} Col-{{pos}} | {{message}} \nCall Stack:\n{{stack}}',
  LOGGER_DATE_FORMAT: 'UTC:yyyy-mm-dd HH:MM:ss,l Z',
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
  SUCCESS: 200,
  LOCATION_QUERY_INPUT_MISSING: 'Location query is required for search to work',
  HOTEL_SEARCH_INPUT_MISSING:
    'Latitude and Longitude are required for search to work'
};
