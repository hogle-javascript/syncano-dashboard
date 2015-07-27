import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

//Stores & Actions
import SessionActions from '../Session/SessionActions';
import GroupsActions from './GroupsActions';
import UsersActions from './UsersActions';
import UsersStore from './UsersStore';

let GroupsStore = Reflux.createStore({
  listenables : GroupsActions,

  mixins : [
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

    this.data.items = Object.keys(groups).map(function(key) {
      return groups[key];
    });

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
    GroupsActions.fetchGroups();
  },

  onSetActiveGroup(group) {
    console.debug('GroupsStore::onSetActiveGroup');

    var isCurrentActiveGroup = this.data.activeGroup && this.data.activeGroup.id === group.id;
    this.data.activeGroup = isCurrentActiveGroup ? null : group;
    this.trigger(this.data);
  },

  onFetchGroups(items) {
    console.debug('GroupsStore::onFetchGroups');
    this.trigger(this.data);
  },

  onFetchGroupsCompleted(items) {
    console.debug('GroupsStore::onFetchGroupsCompleted');
    GroupsActions.setGroups(items);
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

module.exports = GroupsStore;
