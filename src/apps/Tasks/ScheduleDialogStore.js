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
      payload: '*/5 * * *',
      text: 'Each 5 minutes'
    },
    {
      payload: '0 * * * *',
      text: 'Each round hour'
    }
  ],

  getInitialState: function() {
    return {
      label     : null,
      crontab   : null,
      codebox   : null,
      codeboxes : [
        {payload: null, text: 'Loading...'}
      ]
    }
  },

  init: function() {
    this.listenToForms();
    this.listenTo(CodeBoxesActions.setCodeBoxes, this.getCodeBoxesDropdown);
  },

  getCodeBoxesDropdown: function() {
    console.debug('ScheduleDialogStore::getCodeBoxesDropdown');
    var codeboxes = CodeBoxesStore.getCodeBoxesDropdown();

    if (codeboxes.length === 0) {
      codeboxes = [{payload: null, text: 'No codeboxes, add one first'}];
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
