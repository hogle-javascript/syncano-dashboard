var Reflux        = require('reflux'),

    SessionStore  = require('../Session/SessionStore'),
    HeaderActions = require('./HeaderActions');

var HeaderStore = Reflux.createStore({
  listenables: HeaderActions,

  getInitialState: function () {
    return {
      breadcrumbs : [],
      menuItems   : [],
      user        : {},
    }
  },

  init: function () {
    this.data = this.getInitialState();
    this.listenTo(SessionStore, this.refreshUserData);
  },

  refreshUserData: function (Session) {
    if (Session.isReady()) {
      this.data.user = Session.user;
      this.trigger(this.data);
    };

    this.listenTo(SessionStore, this.refreshData);
  },

  refreshData: function() {
    this.trigger(this);
  },

  getSelectedIndex: function() {
    if (!this.data.menuItems) {
      return 0
    }
    var selectedItemIndex = null;
    this.data.menuItems.some(function (item, index) {
      if (item.active) {
        selectedItemIndex = index;
        return true;
      }
    });
    return selectedItemIndex;
  },

  onSetBreadcrumbs: function (payload) {
    this.data.breadcrumbs = payload;
    this.trigger(this.data);
  },

  onClearBreadcrumbs: function () {
    this.data.breadcrumbs = [];
    this.trigger(this.data);
  },

  onSetMenuItems: function (payload) {
    this.data.menuItems = payload;
    this.trigger(this.data);
  },

  onClearMenuItems: function () {
    this.data.menuItems = [];
    this.trigger(this.data);
  },

  onSet: function (payload) {
    this.data = payload;
    this.trigger(this.data);
  },

  onClear: function () {
    this.data = this.getInitialState();
  },

});

module.exports = HeaderStore;
