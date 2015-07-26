import Reflux from 'reflux';
import URL from 'url';

// Utils & Mixins
import CheckListStoreMixin from '../../mixins/CheckListStoreMixin';
import StoreFormMixin from '../../mixins/StoreFormMixin';
import WaitForStoreMixin from '../../mixins/WaitForStoreMixin';

import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import SolutionEditActions from './SolutionEditActions';

export default Reflux.createStore({
  listenables : SolutionEditActions,

  mixins      : [
    CheckListStoreMixin,
    StoreFormMixin,
    WaitForStoreMixin
  ],

  getInitialState() {
    return {
      item: {
        stars_count : 0
      },
      versions: null,
      isLoading: false
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
    console.debug('SolutionsEditStore::refreshData');
    let solutionId = SessionStore.router.getCurrentParams().solutionId;
    SolutionEditActions.fetchSolution(solutionId);
    SolutionEditActions.fetchSolutionVersions(solutionId);
  },

  getSolution() {
    return this.data.item;
  },

  setSolution(solution) {
    console.debug('SolutionsEditStore::setSolutions');
    this.data.item = solution;
    this.trigger(this.data);
  },

  setSolutionVersions(versions) {
    console.debug('SolutionsEditStore::setSolutions');

    this.data.versions = [];

    this.data.hasNextPage = versions.hasNextPage();
    this.data.nextParams  = URL.parse(versions.next() || '', true).query;
    this.data.prevParams  = URL.parse(versions.prev() || '', true).query;

    let newItems = [];
    Object.keys(versions).map(function(key) {
      newItems.splice(0, 0, versions[key]);
    }.bind(this));

    this.data.versions = this.data.versions.concat(newItems);

    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onFetchSolution(solution) {
    console.debug('SolutionsEditStore::onFetchSolutions');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchSolutionCompleted(solution) {
    console.debug('SolutionsEditStore::onFetchSolutionsCompleted');
    this.data.isLoading = false;
    SolutionEditActions.setSolution(solution);
  },

  onFetchSolutionFailure() {
    console.debug('SolutionsEditStore::onFetchSolutionsFailure');
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onFetchSolutionVersions() {
    console.debug('SolutionsEditStore::onFetchSolutionVersions');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchSolutionVersionsCompleted(versions) {
    console.debug('SolutionsEditStore::onFetchSolutionVersionsCompleted');
    this.data.isLoading = false;
    SolutionEditActions.setSolutionVersions(versions);
  },

  onFetchSolutionVersionsFailure() {
    console.debug('SolutionsEditStore::onFetchSolutionVersionsFailure');
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onRemoveSolution() {
    console.debug('SolutionsEditStore::onRemoveSolution');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onRemoveSolutionCompleted() {
    console.debug('SolutionsEditStore::onRemoveSolution');
    this.data.isLoading = false;
  },

  onRemoveSolutionFailure() {
    console.debug('SolutionsEditStore::onRemoveSolutionFailure');
    this.data.isLoading = false;
    this.trigger(this.data);
  },

});
