import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import Actions from './UsersActions';

export default Reflux.createStore({
  listenables: [Actions],

  mixins: [
    Mixins.CheckListStore,
    Mixins.StoreLoading,
    Mixins.WaitForStore
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
    this.setLoadingStates();
  },

  refreshData() {
    Actions.fetchUsers();
  },

  setUsers(users) {
    let usersArray = users._items ? users._items : users;

    this.data.items = Object.keys(usersArray).map((key) => {
      return usersArray[key].user ? usersArray[key].user : usersArray[key];
    });
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

  onSetActiveGroup() {
    console.debug('UsersStore::onSetActiveGroup');
    this.refreshData();
  }
});
