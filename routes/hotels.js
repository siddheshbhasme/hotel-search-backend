const express = require('express');
const router = express.Router();
const logger = require('../common/logger').getLogger();
const { searchHotels } = require('../controllers');
const { SUCCESS, SERVER_ERROR } = require('../constants');

/**
 * @swagger
 * /hotels:
 *   get:
 *     tags:
 *       - Hotels
 *     description: Returns list of hotels
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: lat
 *         description: Latitude for the location
 *         in: query
 *         required: true
 *         default: 48.1351
 *         type: number
 *       - name: long
 *         description: Longitude for the location
 *         in: query
 *         required: true
 *         default: 11.5818
 *         type: number
 *       - name: radius
 *         description: Radius to search from the location in KMs
 *         in: query
 *         default: 30
 *         required: false
 *         type: integer
 *       - name: size
 *         description: Count of hotels to list in single request
 *         in: query
 *         default: 30
 *         required: false
 *         type: integer
 *       - name: token
 *         description: Token for listing Next / Previous list of hotels
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Failure
 *       400:
 *         description: Bad Request
 */
router.get('/', async (req, res) => {
  try {
    const criteria = {
      longitude: req.query.long,
      latitude: req.query.lat,
      radius: req.query.radius || 30,
      size: req.query.size || 30,
      token: req.query.token
    };
    logger.info('Search Criteria:', JSON.stringify(criteria));
    const output = await searchHotels(criteria);
    const statusCode = output.status || SUCCESS;
    res.status(statusCode).send(output);
  } catch (err) {
    logger.warn('Error occured during GET /hotels');
    logger.error(err);
    res.status(SERVER_ERROR).send(err);
  }
});

module.exports = router;
