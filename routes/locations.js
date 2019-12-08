const express = require('express');
const router = express.Router();
const logger = require('../common/logger').getLogger();
const { suggestLocations } = require('../controllers');

/**
 * @swagger
 * /locations:
 *   get:
 *     tags:
 *       - Locations
 *     description: Returns suggestions based on string
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: query
 *         description: Location to search
 *         in: query
 *         required: true
 *         default: Munich
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
    logger.info('Search Query:', req.query.query);
    const output = await suggestLocations(req.query.query);
    const statusCode = output.status || 200;
    res.status(statusCode).send(output);
  } catch (err) {
    logger.warn('Error occured during GET /locations');
    logger.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;
