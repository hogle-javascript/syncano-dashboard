var Syncano    = require('../../lib/syncano4'),
    connection = new Syncano(undefined, SYNCANO_BASE_URL);

module.exports = {
  Syncano: Syncano,
  Deferred: connection.Deferred,
  D: connection.Deferred,

  get: function() {
    return connection;
  },

  set: function(_connection) {
    connection = _connection;
  },

  reset: function() {
    connection = new Syncano(undefined, SYNCANO_BASE_URL);
    connection.setApiKey(null);
    return connection;
  }
};
