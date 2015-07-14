var Reflux           = require('reflux'),

    // Utils & Mixins
    StoreFormMixin   = require('../../mixins/StoreFormMixin'),
    DialogStoreMixin = require('../../mixins/DialogStoreMixin'),

    //Stores & Actions
    SessionActions = require('../Session/SessionActions'),

    DataViewsActions = require('../Data/DataViewsActions'),
    WebhooksActions  = require('../Data/WebhooksActions'),
    ClassesActions   = require('../Classes/ClassesActions'),
    CodeBoxesActions = require('../CodeBoxes/CodeBoxesActions'),
    TriggersActions  = require('../Tasks/TriggersActions'),
    SchedulesActions = require('../Tasks/SchedulesActions'),
    ChannelsActions  = require('../Channels/ChannelsActions'),

    SolutionEditActions = require('./SolutionEditActions'),
    SolutionVersionDialogActions = require('./SolutionVersionDialogActions');

var SolutionVersionDialogStore = Reflux.createStore({
  listenables : SolutionVersionDialogActions,
  mixins      : [
    StoreFormMixin,
    DialogStoreMixin
  ],

  getInitialState: function() {
    return {
      name        : null,
      description : null,
      exportSpec  : {
        //data      : {},
        classes   : {},
        codeboxes : {},
        triggers  : {},
        schedules : {},
        channels  : {},
      }
    };
  },

  init: function() {
    this.listenToForms();
    this.listenTo(SessionActions.fetchInstance.completed, this.fetchInstanceData);
    this.listenTo(SolutionEditActions.createVersion.completed, this.onCreateVersionCompleted);
  },

  fetchInstanceData: function() {
    console.debug('SolutionVersionDialogStore::fetchInstanceData');
    ClassesActions.fetch();
    DataViewsActions.fetch();
    WebhooksActions.fetch();
    CodeBoxesActions.fetch();
    TriggersActions.fetch();
    SchedulesActions.fetch();
    ChannelsActions.fetch();
  },

  onCreateVersionCompleted: function() {
    console.debug('SolutionVersionDialogStore::onCreateSolutionCompleted');
    this.dismissDialog();
    SolutionEditActions.fetch();
  },

});

module.exports = SolutionVersionDialogStore;
