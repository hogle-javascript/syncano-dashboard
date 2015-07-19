import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import Actions from './SolutionsActions';

var SolutionsStore = Reflux.createStore({
  listenables : Actions,

  mixins      : [
    Mixins.StoreForm,
    Mixins.WaitForStore
  ],

  getInitialState() {
    return {
      items        : [],
      tags         : [],
      selectedTags : [],
      isLoading    : false
    }
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      this.refreshData
    );
    this.listenToForms();
  },

  refreshData() {
    console.debug('SolutionsStore::refreshData');
    this.refreshSolutions();
    Actions.fetchTags();
  },

  refreshSolutions() {
    let payload = {};
    if (this.data.filter == 'created_by_me') {
      payload.created_by_me = true;
    }
    if (this.data.filter == 'starred_by_me') {
      payload.starred_by_me = true;
    }

    if (this.data.selectedTags.length)
      payload.tags = this.data.selectedTags;

    Actions.fetchSolutions(payload);
  },

  setSolutions(solutions) {
    console.debug('SolutionsStore::setSolutions');
    this.data.items = Object.keys(solutions).map(function(key) {
      return solutions[key];
    });
    this.trigger(this.data);
  },

  setTags(tags) {
    this.data.tags = Object.keys(tags).map(function(key) {
      return tags[key];
    });
    this.trigger(this.data);
  },

  onToggleTagSelection(tag) {
    let i = this.data.selectedTags.indexOf(tag);
    if (i === -1)
        this.data.selectedTags.push(tag);
    else
        this.data.selectedTags.splice(i, 1);
    this.trigger(this.data);

    this.refreshSolutions();
  },

  onSetFilter(filter) {
    this.data.filter = filter;
    this.refreshSolutions();
  },

  onFetchSolutions(solutions) {
    console.debug('SolutionsStore::onFetchSolutions');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchSolutionsCompleted(items) {
    console.debug('SolutionsStore::onFetchSolutionsCompleted');
    this.data.isLoading = false;
    Actions.setSolutions(items);
  },

  onFetchSolutionsFailure() {
    console.debug('SolutionsStore::onFetchSolutionsFailure');
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onFetchTags() {
    console.debug('SolutionsStore::onFetchTags');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchTagsCompleted(tags) {
    console.debug('SolutionsStore::onFetchTagsCompleted');
    this.data.isLoading = false;
    Actions.setTags(tags);
  },

  onFetchTagsFailure() {
    console.debug('SolutionsStore::onFetchTagsFailure');
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onUnstarSolutionCompleted() {
    console.debug('SolutionsStore::onUnstarSolutionCompleted');
    this.trigger(this.data);
    this.refreshData();
  },

  onStarSolutionCompleted() {
    console.debug('SolutionsStore::onStarSolutionCompleted');
    this.trigger(this.data);
    this.refreshData();
  }

});

module.exports = SolutionsStore;
