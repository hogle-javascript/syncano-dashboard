var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin      = require('../../mixins/StoreFormMixin'),

    //Stores & Actions
    SessionStore        = require('../Session/SessionStore'),
    SchedulesActions    = require('./SchedulesActions');


var SchedulesStore = Reflux.createStore({
  listenables : SchedulesActions,
  mixins      : [
    CheckListStoreMixin,
    StoreFormMixin
  ],

  getInitialState: function () {
    return {
      items     : [],
      isLoading : false
    }
  },

  init: function () {
    this.data = this.getInitialState();
    this.listenTo(SessionStore, this.refreshData);
    this.listenToForms();
  },

  refreshData: function (data) {
    console.debug('SchedulesStore::refreshData');
    if (SessionStore.getInstance() !== null) {
      SchedulesActions.getSchedules();
    }
  },

  onGetSchedules: function(items) {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onGetSchedulesCompleted: function(items) {
    console.debug('SchedulesStore::onGetInstanesCompleted');

    this.data.items = Object.keys(items).map(function(item) {
        return items[item];
    });
    this.data.isLoading = false;
    this.trigger(this.data);
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
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  }

});

module.exports = SchedulesStore;