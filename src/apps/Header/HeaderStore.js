var Reflux        = require('reflux'),
    HeaderActions = require('./HeaderActions');


var HeaderStore = Reflux.createStore({
  listenables: HeaderActions,

  getInitialState: function () {
    return {
      breadcrumbs : [],
      menuItems   : [],
    }
  },

  init: function () {
    this.data = this.getInitialState();
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

  onClear: function () {
    this.data = this.getInitialState();
  },

});

module.exports = HeaderStore;
