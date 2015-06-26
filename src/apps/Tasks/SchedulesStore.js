var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin      = require('../../mixins/StoreFormMixin'),
    WaitForStoreMixin   = require('../../mixins/WaitForStoreMixin'),

    //Stores & Actions
    SessionActions      = require('../Session/SessionActions'),
    SchedulesActions    = require('./SchedulesActions');


var SchedulesStore = Reflux.createStore({
  listenables : SchedulesActions,
  mixins      : [
    CheckListStoreMixin,
    StoreFormMixin,
    WaitForStoreMixin
  ],

  crontabItems: [
    {
      payload: '*/5 * * *',
      text: 'Each 5 minutes'
    },
    {
      payload: '0 * * * *',
      text: 'Each round hour'
    }
  ],

  getInitialState: function () {
    return {
      items     : [],
      isLoading : false
    }
  },

  init: function () {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      this.refreshData
    );
    this.listenToForms();
  },

  getSchedules: function (empty) {
    return this.data.items || empty || null;
  },

  setSchedules: function (items) {
    console.debug('SchedulesStore::setSchedules');
    this.data.items = Object.keys(items).map(function(key) {
        return items[key];
    });
    this.trigger(this.data);
  },

  refreshData: function () {
    console.debug('SchedulesStore::refreshData');
    SchedulesActions.fetchSchedules();
  },

  getCrontabDropdown: function () {
    return this.crontabItems;
  },

  onFetchSchedules: function(items) {
    console.debug('SchedulesStore::onFetchSchedules');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchSchedulesCompleted: function(items) {
    console.debug('SchedulesStore::onFetchSchedulesCompleted');
    this.data.isLoading = false;
    SchedulesActions.setSchedules(items);
  },

  onCreateScheduleCompleted: function(payload) {
    console.debug('SchedulesStore::onCreateScheduleCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onUpdateScheduleCompleted: function(paylod) {
    console.debug('SchedulesStore::onUpdateScheduleCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onRemoveSchedulesCompleted: function(payload) {
    console.debug('SchedulesStore::onRemoveSchedulesCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  }

});

module.exports = SchedulesStore;