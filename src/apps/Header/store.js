var Request = require('superagent');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var uuid = require('node-uuid');

var AppDispatcher = require('../../dispatcher/AppDispatcher');
//var AccountStore = require('./AccountStore');
//var ViewActions = require('../actions/ViewActions');
//var ServerActions = require('../actions/ServerActions');
var Constants = require('../../constants/Constants');


var CHANGE_EVENT = 'change';

var appView = {};
var menuName = null;


var HeaderStore = assign(EventEmitter.prototype, {

  getAppView: function () {
    return appView;
  },

  getMenu: function () {
    return menuName;
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

});

HeaderStore.dispatchToken = AppDispatcher.register(function (payload) {

  HeaderStore.emitChange();

});

module.exports = HeaderStore;