var analytics = require('analytics');

if (ANALYTICS_WRITE_KEY !== undefined && ANALYTICS_WRITE_KEY.length > 0) {
  analytics.load(ANALYTICS_WRITE_KEY);
  analytics.page();
};

module.exports = analytics;
