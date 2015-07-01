var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    WaitForStoreMixin   = require('../../mixins/WaitForStoreMixin'),

    //Stores & Actions
    Constants           = require('../../constants/Constants'),
    CodeBoxesActions    = require('../CodeBoxes/CodeBoxesActions'),
    SessionActions      = require('../Session/SessionActions'),
    SchedulesActions    = require('./SchedulesActions');

var SchedulesStore = Reflux.createStore({
  listenables : SchedulesActions,
  mixins      : [
    CheckListStoreMixin,
    WaitForStoreMixin
  ],

  getInitialState: function() {
    return {
      items     : [],
      isLoading : true
    }
  },

  init: function() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      CodeBoxesActions.fetchCodeBoxes,
      this.refreshData
    );
  },

  getSchedules: function(empty) {
    return this.data.items || empty || null;
  },

  setSchedules: function(items) {
    console.debug('SchedulesStore::setSchedules');
    this.data.items = Object.keys(items).map(function(key) {
      return items[key];
    });
    this.trigger(this.data);
  },

  refreshData: function() {
    console.debug('SchedulesStore::refreshData');
    SchedulesActions.fetchSchedules();
  },

  onFetchSchedules: function() {
    console.debug('SchedulesStore::onFetchSchedules');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchSchedulesCompleted: function(items) {
    console.debug('SchedulesStore::onFetchSchedulesCompleted');
    this.data.isLoading = false;
    SchedulesActions.setSchedules(items);
  },

  onRemoveSchedulesCompleted: function() {
    console.debug('SchedulesStore::onRemoveSchedulesCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  }

});

module.exports = SchedulesStore;
