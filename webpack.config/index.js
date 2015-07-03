var ENV      = process.env.NODE_ENV || 'development';
    settings = require('./' + ENV);

module.exports = settings;
