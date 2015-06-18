if (SENTRY_DSN !== undefined && SENTRY_DSN.length > 0) {
  var Raven = require('raven-js');

  require('raven-js/plugins/console');
  require('raven-js/plugins/native');

  Raven.config(SENTRY_DSN).install();
  module.exports = Raven;
}

