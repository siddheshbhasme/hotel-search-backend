const hotelRoutes = require('./hotels');

module.exports = app => {
  app.use('/hotels', hotelRoutes);
};
