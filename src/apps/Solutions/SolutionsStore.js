var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin      = require('../../mixins/StoreFormMixin'),
    WaitForStoreMixin   = require('../../mixins/WaitForStoreMixin'),

    SessionActions      = require('../Session/SessionActions'),
    SessionStore        = require('../Session/SessionStore'),
    SolutionsActions    = require('./SolutionsActions');

var SolutionsStore = Reflux.createStore({
  listenables : SolutionsActions,
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
    console.debug('SolutionsStore::refreshData');
    SolutionsActions.fetchSolutions();
  },

  // Filters
  filterMySolutions: function(item) {
    return item.owner.email === SessionStore.getUser().email;
  },

  filterOtherSolutions: function(item) {
    return item.owner.email !== SessionStore.getUser().email;
  },

  getMySolutions: function() {
    return this.data.items.filter(this.filterMySolutions);
  },

  getOtherSolutions: function() {
    return this.data.items.filter(this.filterOtherSolutions);
  },

  setSolutions: function(solutions) {
    console.debug('SolutionsStore::setSolutions');
    this.data.items = Object.keys(solutions).map(function(key) {
      return solutions[key];
    });
    this.trigger(this.data);
  },

  onFetchSolutions: function(solutions) {
    console.debug('SolutionsStore::onFetchSolutions');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchSolutionsCompleted: function(items) {
    console.debug('SolutionsStore::onFetchSolutionsCompleted');
    this.data.isLoading = false;
    SolutionsActions.setSolutions(items);
  },

  onFetchSolutionsFailure: function() {
    console.debug('SolutionsStore::onFetchSolutionsFailure');
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onCreateSolutionCompleted: function(payload) {
    console.debug('SolutionsStore::onCreateSolutionCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onUpdateSolutionCompleted: function(paylod) {
    console.debug('SolutionsStore::onUpdateSolutionCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onRemoveSolutionsCompleted: function(payload) {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  getCheckedItemIconColor: function() {
    var singleItem = this.getCheckedItem();

    if (!singleItem) {
      return {
        color : null,
        icon  : null
      }
    }

    return {
      color : singleItem.metadata.color,
      icon  : singleItem.metadata.icon
    };
  }

});

module.exports = SolutionsStore;
