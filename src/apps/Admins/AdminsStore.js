import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import AdminsInvitationsActions from './AdminsInvitationsActions';
import AdminsInvitationsStore from './AdminsInvitationsStore';
import AdminsActions from './AdminsActions';

export default Reflux.createStore({
  listenables: AdminsActions,
  mixins: [
    Reflux.connect(AdminsInvitationsStore),
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
      this.refreshData
    );
    this.setLoadingStates();
  },

  refreshData() {
    console.debug('AdminsStore::refreshData');
    AdminsActions.fetchAdmins();
    AdminsInvitationsActions.fetchInvitations();
  },

  setAdmins(items) {
    console.debug('AdminsStore::setAdmins');

    this.data.items = Object.keys(items).map((key) => items[key]);
    this.trigger(this.data);
  },

  onSelectAllAdmins() {
    console.debug('AdminsStore::onSelectAllAdmins');
    this.data.items.forEach((item) => {
      let instanceOwnerId = SessionStore.getInstance().owner.id;

      if (item.id !== instanceOwnerId) {
        item.checked = true;
      }
      this.trigger(this.data);
    });
  },

  onFetchAdmins() {
    console.debug('AdminsStore::onFetchAdmins');
    this.trigger(this.data);
  },

  onFetchAdminsCompleted(items) {
    console.debug('AdminsStore::onFetchAdminsCompleted');
    this.trigger(this.data);
    AdminsActions.setAdmins(items);
  },

  onRemoveAdminsCompleted() {
    console.debug('AdminsStore::onRemoveAdminsCompleted');
    this.data.hideDialogs = true;
    this.refreshData();
  }
});
