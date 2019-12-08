const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const {
  SWAGGER_DEFINITION_TITLE,
  SWAGGER_DEFINITION_VERSION
} = require('../constants');

const options = {
  swaggerDefinition: {
    info: {
      title: `${SWAGGER_DEFINITION_TITLE}`,
      version: `${SWAGGER_DEFINITION_VERSION}`
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
