const { hotelService } = require('../services');
const { BAD_REQUEST, HOTEL_SEARCH_INPUT_MISSING } = require('../constants');

const searchHotels = criteria => {
  if (!criteria.longitude || !criteria.latitude) {
    return {
      status: BAD_REQUEST,
      message: HOTEL_SEARCH_INPUT_MISSING
    };
  }
  return hotelService.getHotelsByCordinates(criteria);
};

module.exports = {
  searchHotels
};
