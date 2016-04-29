import Reflux from 'reflux';
import _ from 'lodash';

// Utils & Mixins
import {CheckListStoreMixin, StoreLoadingMixin, WaitForStoreMixin} from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import Actions from './UsersActions';
import GroupsActions from '../Groups/GroupsActions';

export default Reflux.createStore({
  listenables: [Actions],

  mixins: [
    CheckListStoreMixin,
    StoreLoadingMixin,
    WaitForStoreMixin
  ],

  getInitialState() {
    return {
      items: [],
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
    this.listenTo(GroupsActions.setGroups, this.refreshData);
    this.setLoadingStates();
  },

  refreshData() {
    Actions.fetchUsers();
  },

  getItems() {
    return this.data.items;
  },

  getUserById(userId) {
    return _.filter(this.data.items, {id: userId}).length > 0 ? _.filter(this.data.items, {id: userId})[0] : null;
  },

  setUsers(users) {
    this.data.items = users;
    this.trigger(this.data);
  },

  onFetchUsersCompleted(payload) {
    console.debug('UsersStore::onFetchUsersCompleted');
    Actions.setUsers(payload);
  },

  onFetchGroupUsersCompleted(payload) {
    console.debug('UsersStore::onFetchGroupUsersCompleted');
    Actions.setUsers(payload);
  },

  onRemoveUsersCompleted() {
    console.debug('UsersStore::onRemoveUsersCompleted');
    this.data.hideDialogs = true;
    this.refreshData();
  },

  onCreateUserCompleted() {
    console.debug('UsersStore::onCreateUserCompleted');
    this.refreshData();
  },

  onUpdateUserCompleted() {
    console.debug('UsersStore::onUpdateUserCompleted');
    this.refreshData();
  },

  onUpdateGroupCompleted() {
    console.debug('UsersStore::onUpdateGroupCompleted');
    this.refreshData();
  },

  onRemoveGroupsCompleted() {
    console.debug('UsersStore::onRemoveGroupsCompleted');
    this.refreshData();
  },

  onFetchGroupsCompleted() {
    console.debug('UsersStore::onSetActiveGroup');
    this.refreshData();
  }
});
