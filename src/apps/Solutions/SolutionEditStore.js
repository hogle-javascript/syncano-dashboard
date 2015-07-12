var Reflux              = require('reflux'),
    URL                 = require('url'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin      = require('../../mixins/StoreFormMixin'),
    WaitForStoreMixin   = require('../../mixins/WaitForStoreMixin'),

    SessionActions      = require('../Session/SessionActions'),
    SessionStore        = require('../Session/SessionStore'),
    SolutionEditActions = require('./SolutionEditActions');

var SolutionsMyStore = Reflux.createStore({
  listenables : SolutionEditActions,

  mixins      : [
    CheckListStoreMixin,
    StoreFormMixin,
    WaitForStoreMixin
  ],

  getInitialState: function() {
    return {
      item: {
        stars_count : 0
      },
      versions: null,
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
    var solutionId = SessionStore.router.getCurrentParams().solutionId;
    SolutionEditActions.fetchSolution(solutionId);
    SolutionEditActions.fetchSolutionVersions(solutionId);
  },

  getSolution: function() {
    return this.data.item;
  },

  setSolution: function(solution) {
    console.debug('SolutionsMyStore::setSolutions');
    this.data.item = solution;
    this.trigger(this.data);
  },

  setSolutionVersions: function(versions) {
    console.debug('SolutionsMyStore::setSolutions');

    this.data.hasNextPage = versions.hasNextPage();
    this.data.nextParams  = URL.parse(versions.next() || '', true).query;
    this.data.prevParams  = URL.parse(versions.prev() || '', true).query;

    if (!this.data.versions) {
      this.data.versions = []
    }

    var newItems = [];
    Object.keys(versions).map(function(key) {
      newItems.splice(0, 0, versions[key]);
    }.bind(this));

    this.data.versions = this.data.versions.concat(newItems);

    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onFetchSolution: function(solution) {
    console.debug('SolutionsMyStore::onFetchSolutions');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchSolutionCompleted: function(solution) {
    console.debug('SolutionsMyStore::onFetchSolutionsCompleted');
    this.data.isLoading = false;
    SolutionEditActions.setSolution(solution);
  },

  onFetchSolutionFailure: function() {
    console.debug('SolutionsMyStore::onFetchSolutionsFailure');
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onFetchSolutionVersions: function() {
    console.debug('SolutionsMyStore::onFetchSolutionVersions');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchSolutionVersionsCompleted: function(versions) {
    console.debug('SolutionsMyStore::onFetchSolutionVersionsCompleted');
    this.data.isLoading = false;
    SolutionEditActions.setSolutionVersions(versions);
  },

  onFetchSolutionVersionsFailure: function() {
    console.debug('SolutionsMyStore::onFetchSolutionVersionsFailure');
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onRemoveSolution: function() {
    console.debug('SolutionsMyStore::onRemoveSolution');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onRemoveSolutionCompleted: function() {
    console.debug('SolutionsMyStore::onRemoveSolution');
    this.data.isLoading = false;
  },

  onRemoveSolutionFailure: function() {
    console.debug('SolutionsMyStore::onRemoveSolutionFailure');
    this.data.isLoading = false;
    this.trigger(this.data);
  },

});

module.exports = SolutionsMyStore;
