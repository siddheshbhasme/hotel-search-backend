const { hotelService } = require('../services');

const searchHotels = criteria => {
  if (!criteria.longitude || !criteria.latitude) {
    return {
      status: 400,
      message: 'Latitude and Longitude are required for search to work'
    };
  }
  return hotelService.getHotelsByCordinates(criteria);
};

module.exports = {
  searchHotels
};
