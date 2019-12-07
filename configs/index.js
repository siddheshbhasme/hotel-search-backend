const defaults = require('./default');
const env = process.env.NODE_ENV || 'development';
const config = require(`./${env}`);
module.exports = Object.assign({}, defaults, config);
