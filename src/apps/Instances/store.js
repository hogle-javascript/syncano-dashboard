var Request = require('superagent');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var uuid = require('node-uuid');

var AppDispatcher = require('../../dispatcher/AppDispatcher');

var AuthStore  = require('../Auth/store');
//var ViewActions   = require('../actions/ViewActions');
//var ServerActions = require('../actions/ServerActions');
//var Constants     = require('../constants/Constants');
//var Syncano       = require('../../lib/syncano4.js');

var CHANGE_EVENT = 'change';

var instancesStore = {
  allInstances: null,
};

var InstancesStore = assign(EventEmitter.prototype, {
  getInstances: function (instanceFilter) {
    var instances = instancesStore.allInstances;

    if (instanceFilter === "other") {

      var otherInstancesNames = Object.keys(instances).filter(function (key) {
        return instances[key].owner.email !== AuthStore.getAccountInfo('email');
      });
      var otherInstances = otherInstancesNames.map(function(instanceName) {
        return instances[instanceName];
      });
      return otherInstances;
    }
    console.log("getInstances", instances);
    return instances;
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  emitChange: function () {
    console.log('InstancesStore change emitted');
    this.emit(CHANGE_EVENT);
  },

});

InstancesStore.dispatchToken = AppDispatcher.register(function (payload) {

  var action = payload.action;
  var item = action.item;
  var itemType = action.itemType;
  var data = action.data;


  var successGetInstances = function (instances) {
    console.log("successGetInstances", instances);
    instancesStore.allInstances = instances;
    InstancesStore.emitChange();
  };

  var error = function (error) {
    console.log("Error", error);
  };

  console.log('InstanceStore action:', action);
  switch (action.type) {

    case "GET_INSTANCES":
      var instances = Syncano.Instances.list().then(successGetInstances, error);
      break;
  }

  //InstancesStore.emitChange();

});

module.exports = InstancesStore;