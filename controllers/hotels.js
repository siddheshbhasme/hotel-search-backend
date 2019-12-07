const { hotelService } = require('../services');

const searchHotels = criteria => {
  return hotelService.getHotelsByCordinates(criteria);
};

module.exports = {
  searchHotels
};
