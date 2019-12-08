const { locationService } = require('../services');

const suggestLocations = query => {
  if (!query) {
    return {
      status: 400,
      message: 'Location query is required for search to work'
    };
  }
  return locationService.getPositionByLocationName(query);
};

module.exports = {
  suggestLocations
};
