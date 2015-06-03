var alt = require('../../alt');


function HeaderActions() {

};

HeaderActions.prototype.setBreadcrumbs = function (payload) {
  this.dispatch(payload);
};

HeaderActions.prototype.pushBreadcrumb = function (payload) {
  this.dispatch(payload);
};

HeaderActions.prototype.popBreadcrumb = function () {
  this.dispatch();
};

HeaderActions.prototype.clearBreadcrumbs = function () {
  this.dispatch();
};

HeaderActions.prototype.setMenuItems = function (payload) {
  this.dispatch(payload);
};

HeaderActions.prototype.pushMenuItem = function (payload) {
  this.dispatch(payload);
};

HeaderActions.prototype.popMenuItem = function () {
  this.dispatch();
};

HeaderActions.prototype.clearMenuItems = function () {
  this.dispatch();
};

module.exports = alt.createActions(HeaderActions);