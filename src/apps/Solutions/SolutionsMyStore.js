var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin      = require('../../mixins/StoreFormMixin'),
    WaitForStoreMixin   = require('../../mixins/WaitForStoreMixin'),

    SessionActions      = require('../Session/SessionActions'),
    SessionStore        = require('../Session/SessionStore'),
    SolutionsMyActions    = require('./SolutionsMyActions');

var SolutionsMyStore = Reflux.createStore({
  listenables : SolutionsMyActions,

  mixins      : [
    CheckListStoreMixin,
    StoreFormMixin,
    WaitForStoreMixin
  ],

  getInitialState: function() {
    return {
      items: [],
      isLoading: false
    }
  },

  init: function() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      this.refreshData
    );
    this.listenToForms();
  },

  refreshData: function() {
    console.debug('SolutionsMyStore::refreshData');
    SolutionsMyActions.fetchSolutions();
  },

  setSolutions: function(solutions) {
    console.debug('SolutionsMyStore::setSolutions');
    this.data.items = Object.keys(solutions).map(function(key) {
      return solutions[key];
    });
    this.trigger(this.data);
  },

  onFetchSolutions: function(solutions) {
    console.debug('SolutionsMyStore::onFetchSolutions');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchSolutionsCompleted: function(items) {
    console.debug('SolutionsMyStore::onFetchSolutionsCompleted');
    this.data.isLoading = false;
    SolutionsMyActions.setSolutions(items);
  },

  onFetchSolutionsFailure: function() {
    console.debug('SolutionsMyStore::onFetchSolutionsFailure');
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onUnstarSolutionCompleted: function() {
    console.debug('SolutionsMyStore::onUnstarSolutionCompleted');
    this.trigger(this.data);
    this.refreshData();
  },

  onStarSolutionCompleted: function() {
    console.debug('SolutionsMyStore::onStarSolutionCompleted');
    this.trigger(this.data);
    this.refreshData();
  }

});

module.exports = SolutionsMyStore;
