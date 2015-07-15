var Reflux           = require('reflux'),

    // Utils & Mixins
    StoreFormMixin   = require('../../mixins/StoreFormMixin'),
    DialogStoreMixin = require('../../mixins/DialogStoreMixin'),

    //Stores & Actions
    SessionActions = require('../Session/SessionActions'),
    InstancesActions = require('../Instances/InstancesActions'),
    SolutionsEditActions = require('./SolutionEditActions'),
    SolutionInstallDialogActions = require('./SolutionInstallDialogActions');

var SolutionVersionDialogStore = Reflux.createStore({
  listenables : SolutionInstallDialogActions,
  mixins      : [
    StoreFormMixin,
    DialogStoreMixin
  ],

  getInitialState: function() {
    return {
    };
  },

  init: function() {
    this.listenToForms();

    this.listenTo(SolutionsEditActions.fetchSolutionVersions.completed, this.refreshState);
    this.listenTo(InstancesActions.fetchInstances.completed, this.refreshState);

    this.listenTo(SolutionsEditActions.installSolution.completed, this.onInstallSolutionCompleted);
  },

  refreshState: function() {
    this.trigger(this)
  },

  onInstallSolutionCompleted: function() {
    console.debug('SolutionVersionDialogStore::onInstallSolutionCompleted');
    this.dismissDialog();
  },

});

module.exports = SolutionVersionDialogStore;
