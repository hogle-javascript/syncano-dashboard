var Reflux            = require('reflux'),

    // Utils & Mixins
    StoreFormMixin    = require('../../mixins/StoreFormMixin'),
    DialogStoreMixin  = require('../../mixins/DialogStoreMixin'),

    //Stores & Actions
    SchedulesActions  = require('./SchedulesActions'),
    CodeBoxesActions  = require('../CodeBoxes/CodeBoxesActions'),
    CodeBoxesStore    = require('../CodeBoxes/CodeBoxesStore');

var ScheduleDialogStore = Reflux.createStore({
  listenables : SchedulesActions,
  mixins      : [
    StoreFormMixin,
    DialogStoreMixin
  ],

  crontabItems: [
    {
      payload: '*/5 * * * *',
      text: 'Run every 5 minutes'
    },
    {
      payload: '0 * * * *',
      text: 'Run once an hour'
    },
    {
      payload: '0 0 * * *',
      text: 'Run once a day on midnight'
    },
    {
      payload: '0 0 * * 0',
      text: 'Run once a week on midnight'
    },
    {
      payload: '0 0 1 * *',
      text: 'Run once a month on midnight'
    },
    {
      payload: '0 0 1 1 *',
      text: 'Run once a year on midnight'
    }
  ],

  getInitialState: function() {
    return {
      label     : null,
      crontab   : null,
      codebox   : null,
      codeboxes : [
        {payload: '', text: 'Loading...'}
      ]
    };
  },

  init: function() {
    this.listenToForms();
    this.listenTo(CodeBoxesActions.setCodeBoxes, this.getCodeBoxesDropdown);
  },

  getCodeBoxesDropdown: function() {
    console.debug('ScheduleDialogStore::getCodeBoxesDropdown');
    var codeboxes = CodeBoxesStore.getCodeBoxesDropdown();

    if (codeboxes.length === 0) {
      codeboxes = [{payload: '', text: 'No codeboxes, add one first'}];
    }

    this.trigger({codeboxes: codeboxes});
  },

  getCrontabDropdown: function() {
    return this.crontabItems;
  },

  onCreateScheduleCompleted: function() {
    console.debug('ScheduleDialogStore::onCreateScheduleCompleted');
    this.dismissDialog();
    SchedulesActions.fetchSchedules();
  },

  onUpdateScheduleCompleted: function() {
    console.debug('ScheduleDialogStore::onUpdateScheduleCompleted');
    this.dismissDialog();
    SchedulesActions.fetchSchedules();
  }

});

module.exports = ScheduleDialogStore;
