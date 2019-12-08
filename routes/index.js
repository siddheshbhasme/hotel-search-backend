const hotelRoutes = require('./hotels');
const locationRoutes = require('./locations');

module.exports = app => {
  app.use('/hotels', hotelRoutes);
  app.use('/locations', locationRoutes);
};
