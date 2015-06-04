var Reflux    = require('reflux');


var HeaderActions = Reflux.createActions([
  'setBreadcrumbs',
  'clearBreadcrumbs',
  'setMenuItems',
  'clearMenuItems',
  'clear',
]);

module.exports = HeaderActions;
