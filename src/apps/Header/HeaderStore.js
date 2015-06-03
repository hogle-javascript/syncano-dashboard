var alt           = require('../../alt'),
    HeaderActions = require('./HeaderActions');


function HeaderStore() {
  this.breadcrumbs   = [];
  this.menu          = [];
  this.notifications = [];

  this.bindListeners({
      handleSetBreadcrumbs: HeaderActions.SET_BREADCRUMBS,
      handlePushBreadcrumb: HeaderActions.PUSH_BREADCRUMB,
      handlePopBreadcrumb: HeaderActions.POP_BREADCRUMB,
      handleClearBreadcrumbs: HeaderActions.CLEAR_BREADCRUMBS,
      handleSetMenuItems: HeaderActions.SET_MENU_ITEMS,
      handlePushMenuItem: HeaderActions.PUSH_MENU_ITEM,
      handlePopMenuItem: HeaderActions.POP_MENU_ITEM,
      handleClearMenuItems: HeaderActions.CLEAR_MENU_ITEMS,
  });
};

HeaderStore.prototype.handleSetBreadcrumbs = function (payload) {
  this.breadcrumbs = payload;
};

HeaderStore.prototype.handlePushBreadcrumb = function (payload) {
  this.breadcrumbs.push(payload);
};

HeaderStore.prototype.handlePopBreadcrumb = function () {
  this.breadcrumbs.pop();
};

HeaderStore.prototype.handleClearBreadcrumbs = function () {
  this.breadcrumbs = [];
};

HeaderStore.prototype.handleSetMenuItems = function (payload) {
  this.menu = payload;
};

HeaderStore.prototype.handlePushMenuItem = function (payload) {
  this.menu.push(payload);
};

HeaderStore.prototype.handlePopMenuItem = function () {
  this.menu.pop();
};

HeaderStore.prototype.handleClearMenuItems = function () {
  this.menu = [];
};

module.exports = alt.createStore(HeaderStore);