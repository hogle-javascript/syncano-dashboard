import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import Actions from './GroupsActions';
import UsersActions from './UsersActions';
import UsersStore from './UsersStore';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    Mixins.CheckListStore,
    Mixins.StoreLoading,
    Mixins.WaitForStore
  ],

  getInitialState() {
    return {
      items: [],
      activeGroup: null,
      isLoading: true
    }
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

    this.data.items = Object.keys(groups).map(key => groups[key]);
    this.trigger(this.data);
  },

  getGroups(empty) {
    return this.data.items || empty || null;
  },

  getActiveGroup(empty) {
    return this.data.activeGroup || empty || null;
  },

  resetActiveGroup() {
    this.data.activeGroup = null;
    this.trigger(this.data);
  },

  refreshData() {
    Actions.fetchGroups();
  },

  onSetActiveGroup(group) {
    console.debug('GroupsStore::onSetActiveGroup');

    let isCurrentActiveGroup = this.data.activeGroup && this.data.activeGroup.id === group.id;
    this.data.activeGroup = isCurrentActiveGroup ? null : group;
    this.trigger(this.data);
  },

  onFetchGroups(items) {
    console.debug('GroupsStore::onFetchGroups');
    this.trigger(this.data);
  },

  onFetchGroupsCompleted(items) {
    console.debug('GroupsStore::onFetchGroupsCompleted');
    Actions.setGroups(items);
  },

  onRemoveGroupsCompleted(payload) {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onFetchGroupUsers() {
    this.data.isLoading = false;
    this.trigger(this.data);
  }
});
