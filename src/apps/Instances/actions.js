var AppDispatcher = require('../../dispatcher/AppDispatcher');

module.exports = {

  getInstances: function(data) {
    AppDispatcher.handleInstancesAppAction({
      type: 'GET_INSTANCES',
      data: data,
    });
  },

};
