var Reflux        = require('reflux'),

    SessionStore  = require('../Session/SessionStore'),
    HeaderActions = require('./HeaderActions');


var HeaderStore = Reflux.createStore({
  listenables: HeaderActions,

  getInitialState: function () {
    return {
      breadcrumbs : [],
      menuItems   : [],
      user        : {}
    }
  },

  init: function () {
    this.listenTo(SessionStore, this.refreshData);
  },

  refreshData: function (Session) {
    console.debug('HeaderStore::refreshData');

    if (Session.isReady()) {
      this.trigger({user: Session.user});
    }

  },

  onSetBreadcrumbs: function (payload) {
    console.debug('HeaderStore::onSetBreadcrumbs');
    this.trigger({breadcrumbs: payload});
  },

  onClearBreadcrumbs: function () {
    console.debug('HeaderStore::onClearBreadcrumbs');
    this.trigger({breadcrumbs: []});
  },

  onSetMenuItems: function (payload) {
    console.debug('HeaderStore::onSetMenuItems');
    this.trigger({menuItems: payload});
  },

  onClearMenuItems: function () {
    console.debug('HeaderStore::onClearMenuItems');
    this.trigger({menuItems: []});
  },

  onSet: function (payload) {
    console.debug('HeaderStore::onSet');
    this.trigger(payload);
  },

  onClear: function (payload) {
    console.debug('HeaderStore::onClear');
    this.trigger({
      breadcrumbs: [],
      menuItems: []
    });
  }

});

module.exports = HeaderStore;
