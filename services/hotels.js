const configs = require('../configs');
const { get } = require('../common/restclient');
const logger = require('../common/logger').getLogger();
const { SERVER_ERROR } = require('../constants');
const baseUrl = 'https://places.demo.api.here.com/places/v1/browse';
const contextString = ';context=';

const getToken = urlWithContext => {
  var token;
  const tokenRegex = /[?&;]context=([^&?]+)/g;
  const matches = tokenRegex.exec(urlWithContext);
  if (matches) {
    token = matches[0].replace(contextString, '');
  }
  return token;
};

const getContextString = token => {
  return token ? `${contextString}${token}` : '';
};

const buildUrl = criteria => {
  const context = getContextString(criteria.token);
  return `${baseUrl}${context}?app_id=${configs.HERE_APP_ID}&app_code=${
    configs.HERE_APP_CODE
  }&in=${criteria.latitude},${criteria.longitude};r=${criteria.radius *
    1000}&size=${criteria.size}&cat=accommodation`;
};

const parseError = error => {
  if (error.response && error.response.data) {
    return error.response.data;
  }
  return {
    status: SERVER_ERROR,
    message: error.message
  };
};

const parseResponse = response => {
  const results = response.data.results || response.data;
  return {
    status: response.status,
    previousToken: getToken(results.previous),
    nextToken: getToken(results.next),
    items: results.items
  };
};

const getHotelsByCordinates = async criteria => {
  const url = buildUrl(criteria);
  logger.info('Invoking HERE API for fetching hotels', url);
  return get(url, parseResponse, parseError);
};

module.exports = {
  getHotelsByCordinates
};
