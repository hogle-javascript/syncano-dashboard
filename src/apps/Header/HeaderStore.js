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
    this.listenTo(SessionStore, this.refreshUserData);
  },

  refreshUserData: function (Session) {
    if (Session.isReady()) {
      this.trigger({user: Session.user});
    }

    this.listenTo(SessionStore, this.refreshData);
  },

  refreshData: function() {
    this.trigger(this);
  },

  onSetBreadcrumbs: function (payload) {
    this.trigger({breadcrumbs: payload});
  },

  onClearBreadcrumbs: function () {
    this.trigger({breadcrumbs: []});
  },

  onSetMenuItems: function (payload) {
    this.trigger({menuItems: payload});
  },

  onClearMenuItems: function () {
    this.trigger({menuItems: []});
  },

  onSet: function (payload) {
    this.trigger(payload);
  },

  onClear: function () {
    this.trigger(this.getInitialState());
  },

});

module.exports = HeaderStore;
