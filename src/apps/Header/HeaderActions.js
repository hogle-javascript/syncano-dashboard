var Reflux    = require('reflux');

var HeaderActions = Reflux.createActions([
  'set',
  'setBreadcrumbs',
  'setMenuItems',
  'clear',
  'clearBreadcrumbs',
  'clearMenuItems',
]);

module.exports = HeaderActions;
