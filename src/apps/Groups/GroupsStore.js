import Reflux from 'reflux';

// Utils & Mixins
import {CheckListStoreMixin, StoreLoadingMixin, WaitForStoreMixin} from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import Actions from './GroupsActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    CheckListStoreMixin,
    StoreLoadingMixin,
    WaitForStoreMixin
  ],

  getInitialState() {
    return {
      items: [],
      activeGroup: null,
      isLoading: true
    };
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      this.refreshData
    );
    this.setLoadingStates();
  },

  setGroups(groups) {
    console.debug('GroupsStore::setGroups');
    this.data.items = groups;
    this.trigger(this.data);
  },

  getGroups(empty) {
    return this.data.items || empty || null;
  },

  refreshData() {
    Actions.fetchGroups();
  },

  onFetchGroupsCompleted(items) {
    console.debug('GroupsStore::onFetchGroupsCompleted');
    Actions.setGroups(items._items);
  },

  onRemoveGroupsCompleted() {
    this.refreshData();
  }
});
