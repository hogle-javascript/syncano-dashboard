var Reflux        = require('reflux'),

    SessionStore  = require('../Session/SessionStore'),
    HeaderActions = require('./HeaderActions');

var HeaderStore = Reflux.createStore({
  listenables: HeaderActions,

  getInitialState: function() {
    return {
      menuItems   : [],
      user        : SessionStore.getUser({})
    }
  },

  init: function() {
    this.listenTo(SessionStore, this.refreshData);
  },

  refreshData: function(Session) {
    console.debug('HeaderStore::refreshData');

    if (Session.isReady()) {
      this.trigger({user: Session.getUser()});
    }

  },

  onSetMenuItems: function(payload) {
    console.debug('HeaderStore::onSetMenuItems');
    this.trigger({menuItems: payload});
  },

  onClearMenuItems: function() {
    console.debug('HeaderStore::onClearMenuItems');
    this.trigger({menuItems: []});
  },

  onSet: function(payload) {
    console.debug('HeaderStore::onSet');
    this.trigger(payload);
  },

  onClear: function(payload) {
    console.debug('HeaderStore::onClear');
    this.trigger({
      menuItems: []
    });
  }

});

module.exports = HeaderStore;
