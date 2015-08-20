/* global SYNCANO_BASE_URL */

import Syncano from '../../lib/syncano4';

let connection = new Syncano(null, SYNCANO_BASE_URL);

export default {
  Syncano,
  Deferred: connection.Deferred,
  D: connection.Deferred,

  get() {
    return connection;
  },

  set(_connection) {
    connection = _connection;
  },

  reset() {
    connection = new Syncano(null, SYNCANO_BASE_URL);
    connection.setApiKey(null);
    return connection;
  }
};
