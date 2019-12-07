const express = require('express');
const path = require('path');
const logger = require('morgan');
const setupRoutess = require('./routes');
const stupMiddlwares = require('./middlewares');

// Init App
const app = express();

// Setup Logger
app.use(logger('dev'));
// Setup Body Parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

// Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Setup Middlewaress
stupMiddlwares(app);

// Setup Routes
setupRoutess(app);

module.exports = app;
