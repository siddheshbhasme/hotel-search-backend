const { locationService } = require('../services');
const { BAD_REQUEST, LOCATION_QUERY_INPUT_MISSING } = require('../constants');
const suggestLocations = query => {
  if (!query) {
    return {
      status: BAD_REQUEST,
      message: LOCATION_QUERY_INPUT_MISSING
    };
  }
  return locationService.getPositionByLocationName(query);
};

module.exports = {
  suggestLocations
};
