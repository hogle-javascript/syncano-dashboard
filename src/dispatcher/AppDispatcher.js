var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var AppDispatcher = assign(new Dispatcher(), {

  handleInstancesAppAction: function(action) {
    this.dispatch({
      source: 'INSTANCES_APP_ACTION',
      action: action
    });
  },


  handleAuthAction: function(action) {
    this.dispatch({
      source: 'AUTH_ACTION',
      action: action
    });
  },

  handleServerAction: function(action) {
    this.dispatch({
      source: 'SERVER_ACTION',
      action: action
    });
  },

  handleViewAction: function(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }

});

module.exports = AppDispatcher;
