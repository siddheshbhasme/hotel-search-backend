const configs = require('../configs');
const { get } = require('../common/restClient');
const jp = require('jsonpath');
const logger = require('../common/logger').getLogger();
const baseUrl = 'http://geocoder.api.here.com/6.2/geocode.json';

const buildUrl = query => {
  return `${baseUrl}?app_id=${configs.HERE_APP_ID}&app_code=${configs.HERE_APP_CODE}&searchtext=${query}`;
};

const parseError = error => {
  if (error.response && error.response.data) {
    return error.response.data;
  }
  return {
    status: 500,
    message: error.message
  };
};

const parseResponse = response => {
  return {
    status: response.status,
    items: jp.query(response.data, '$.Response.View[*].Result[*].Location')
  };
};

const getPositionByLocationName = async query => {
  const url = buildUrl(query);
  logger.info('Invoking HERE API for fetching locations', url);
  return get(url, parseResponse, parseError);
};

module.exports = {
  getPositionByLocationName
};
