 var Raven = require('raven-js');

if (SENTRY_DSN !== undefined && SENTRY_DSN.length > 0) {
  require('raven-js/plugins/console');
  require('raven-js/plugins/native');

  Raven.config(SENTRY_DSN).install();
}

module.exports = Raven;
