var Reflux           = require('reflux'),

    // Utils & Mixins
    StoreFormMixin   = require('../../mixins/StoreFormMixin'),
    DialogStoreMixin = require('../../mixins/DialogStoreMixin'),

    //Stores & Actions
    SessionStore       = require('../Session/SessionStore'),
    SolutionsActions   = require('./SolutionsActions'),
    SolutionsMyActions = require('./SolutionsMyActions');

var SolutionDialogStore = Reflux.createStore({
  listenables : SolutionsActions,
  mixins      : [
    StoreFormMixin,
    DialogStoreMixin
  ],

  getInitialState: function() {
    return {
      name        : null,
      description : null
    };
  },

  init: function() {
    this.listenToForms();
  },

  onCreateSolutionCompleted: function(solution) {
    console.debug('SolutionDialogStore::onCreateSolutionCompleted');
    this.dismissDialog();
    SolutionsMyActions.fetchSolutions();
    SessionStore.getRouter().transitionTo(
      'solutions-edit',
      {
        solutionId : solution.id
      }
    );
  },

  onUpdateSolutionCompleted: function() {
    console.debug('SolutionDialogStore::onUpdateSolutionCompleted');
    this.dismissDialog();
    SolutionsActions.fetchSolutions();
  }

});

module.exports = SolutionDialogStore;
