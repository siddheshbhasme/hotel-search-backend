const axios = require('axios');
const logger = require('../common/logger').getLogger();
const get = (url, resonseHanlder, errorHandler) => {
  return axios
    .get(url)
    .then(response => {
      logger.info('Successfully fetched response from API');
      return resonseHanlder(response);
    })
    .catch(error => {
      logger.warn('Error occured while invoking API');
      logger.error(error);
      return errorHandler(error);
    });
};

module.exports = {
  get
};
