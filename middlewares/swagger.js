const constants = require('../constants');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    info: {
      title: `${constants.SWAGGER_DEFINITION_TITLE}`,
      version: `${constants.SWAGGER_DEFINITION_VERSION}`
    },
    basePath: '/'
  },
  apis: ['./routes/*.js']
};
const specs = swaggerJsdoc(options);

const setupSwaggerUi = app => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = setupSwaggerUi;
