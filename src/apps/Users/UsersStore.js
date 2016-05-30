import Reflux from 'reflux';
import _ from 'lodash';
import URI from 'urijs';

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

  setUsers(items, rawData) {
    console.debug('UsersStore::setUsers');

    this.data.hasNextPage = items.hasNext();

    if (!this.data.items) {
      this.data.items = [];
    }

    this.data.items = _.uniqBy(this.data.items.concat(items), 'id');
    this.data.nextParams = new URI(rawData.next || '').search(true);
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onFetchUsersCompleted(payload, rawData) {
    console.debug('UsersStore::onFetchUsersCompleted');
    this.data.items = [];
    Actions.setUsers(payload, rawData);
  },

  onSubFetchUsersCompleted(payload, rawData) {
    console.debug('UsersStore::onSubFetchUsersCompleted');
    Actions.setUsers(payload, rawData);
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
  }
});
