var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
  
    //Stores & Actions
    SessionStore        = require('../Session/SessionStore'),
    SchedulesActions    = require('./SchedulesActions');


var SchedulesStore = Reflux.createStore({
  listenables : SchedulesActions,
  mixins      : [CheckListStoreMixin],

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
      // Lists
      items: [],
      isLoading: false,

      // Dialogs
      errors: {}
    }
  },

  init: function () {

    this.data = {
      // List
      items: [],
      isLoading: false,

      // Dialogs
      errors: {},
      canSubmit: true
    };

    // We want to know when we are ready to download data for this store,
    // it depends on instance we working on
    this.listenTo(SessionStore, this.refreshData);
  },

  refreshData: function (data) {
    console.debug('SchedulesStore::refreshData');
    if (SessionStore.instance) {
      SchedulesActions.getSchedules();
    }
  },

  getCrontabDropdown: function () {
    return this.crontabItems;
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

  onCreateScheduleFailure: function(payload) {
    console.debug('SchedulesStore::onCreateScheduleCompleted');

    // TODO: create a mixin for that
    if (typeof payload === 'string') {
      this.data.errors.feedback = payload;
    } else {
      if (payload.non_field_errors !== undefined) {
        this.data.errors.feedback = payload.non_field_errors.join();
      }

      for (var field in payload) {
        this.data.errors[field] = payload[field];
      }
    }
    this.trigger(this.data);
  },
  
  onUpdateScheduleCompleted: function(paylod) {
    console.debug('SchedulesStore::onUpdateScheduleCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onUpdateScheduleFailure: function(payload) {
    console.debug('SchedulesStore::onUpdateScheduleFailure');

    // TODO: create a mixin for that
    if (typeof payload === 'string') {
      this.data.errors.feedback = payload;
    } else {
      if (payload.non_field_errors !== undefined) {
        this.data.errors.feedback = payload.non_field_errors.join();
      }

      for (var field in payload) {
        this.data.errors[field] = payload[field];
      }
    }
    this.trigger(this.data);
  },

  onRemoveSchedulesCompleted: function(payload) {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

});

module.exports = SchedulesStore;