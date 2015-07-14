var Reflux              = require('reflux'),
    URL                 = require('url'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin      = require('../../mixins/StoreFormMixin'),
    WaitForStoreMixin   = require('../../mixins/WaitForStoreMixin'),

    SessionActions      = require('../Session/SessionActions'),
    SessionStore        = require('../Session/SessionStore'),
    SolutionEditActions = require('./SolutionEditActions');

var SolutionsEditStore = Reflux.createStore({
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
    console.debug('SolutionsEditStore::refreshData');
    var solutionId = SessionStore.router.getCurrentParams().solutionId;
    SolutionEditActions.fetchSolution(solutionId);
    SolutionEditActions.fetchSolutionVersions(solutionId);
  },

  getSolution: function() {
    return this.data.item;
  },

  setSolution: function(solution) {
    console.debug('SolutionsEditStore::setSolutions');
    this.data.item = solution;
    this.trigger(this.data);
  },

  setSolutionVersions: function(versions) {
    console.debug('SolutionsEditStore::setSolutions');

    this.data.versions = [];

    this.data.hasNextPage = versions.hasNextPage();
    this.data.nextParams  = URL.parse(versions.next() || '', true).query;
    this.data.prevParams  = URL.parse(versions.prev() || '', true).query;

    var newItems = [];
    Object.keys(versions).map(function(key) {
      newItems.splice(0, 0, versions[key]);
    }.bind(this));

    this.data.versions = this.data.versions.concat(newItems);

    this.data.isLoading = false;
    this.trigger(this.data);
  },

  getVersionsDropdown: function() {
    if (!this.data.versions) {
      return [];
    }
    return this.data.versions.map(function(item) {
      return {
        payload : item.id,
        text    : item.number
      }
    });
  },

  onFetchSolution: function(solution) {
    console.debug('SolutionsEditStore::onFetchSolutions');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchSolutionCompleted: function(solution) {
    console.debug('SolutionsEditStore::onFetchSolutionsCompleted');
    this.data.isLoading = false;
    SolutionEditActions.setSolution(solution);
  },

  onFetchSolutionFailure: function() {
    console.debug('SolutionsEditStore::onFetchSolutionsFailure');
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onFetchSolutionVersions: function() {
    console.debug('SolutionsEditStore::onFetchSolutionVersions');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchSolutionVersionsCompleted: function(versions) {
    console.debug('SolutionsEditStore::onFetchSolutionVersionsCompleted');
    this.data.isLoading = false;
    SolutionEditActions.setSolutionVersions(versions);
  },

  onFetchSolutionVersionsFailure: function() {
    console.debug('SolutionsEditStore::onFetchSolutionVersionsFailure');
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onRemoveSolution: function() {
    console.debug('SolutionsEditStore::onRemoveSolution');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onRemoveSolutionCompleted: function() {
    console.debug('SolutionsEditStore::onRemoveSolution');
    this.data.isLoading = false;
  },

  onRemoveSolutionFailure: function() {
    console.debug('SolutionsEditStore::onRemoveSolutionFailure');
    this.data.isLoading = false;
    this.trigger(this.data);
  },

});

module.exports = SolutionsEditStore;
