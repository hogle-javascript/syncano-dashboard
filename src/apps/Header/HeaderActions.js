var Reflux    = require('reflux');

var HeaderActions = Reflux.createActions([
  'set',
  'setMenuItems',
  'clear',
  'clearMenuItems'
]);

module.exports = HeaderActions;
