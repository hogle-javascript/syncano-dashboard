import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import UsersActions from './UsersActions';
import GroupsActions from './GroupsActions';
import GroupsStore from './GroupsStore';

export default Reflux.createStore({
  listenables: [UsersActions, GroupsActions],

  mixins: [
    Mixins.CheckListStore,
    Mixins.StoreLoading,
    Mixins.WaitForStore
  ],

  getInitialState() {
    return {
      items: [],
      isLoading: true
    }
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      GroupsActions.setGroups,
      this.refreshData
    );
    this.setLoadingStates();
  },

  refreshData() {
    let activeGroup = GroupsStore.getActiveGroup();

    if (activeGroup) {
      GroupsActions.fetchGroupUsers(activeGroup.id).then(payload => this.setUsers(payload));
    } else {
      UsersActions.fetchUsers().then(payload => this.setUsers(payload));
    }
  },

  setUsers(users) {
    let usersArray = users._items ? users._items : users;

    this.data.items = Object.keys(usersArray).map(key => usersArray[key].user ? usersArray[key].user : usersArray[key]);
    this.trigger(this.data);
  },

  onFetchUsers() {
    console.debug('UsersStore::onFetchUsers');
  },

  onFetchUsersCompleted() {
    console.debug('UsersStore::onFetchUsersCompleted');
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

  onSetActiveGroup() {
    console.debug('UsersStore::onSetActiveGroup');
    this.refreshData();
  }
});
