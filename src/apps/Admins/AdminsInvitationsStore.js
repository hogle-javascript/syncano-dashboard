import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import AdminsInvitationsActions from './AdminsInvitationsActions';
import ColumnMenuActions from '../../common/ColumnList/Column/MenuActions';

export default Reflux.createStore({
  listenables: AdminsInvitationsActions,
  mixins: [
    Mixins.CheckListStore,
    Mixins.StoreForm,
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
    this.listenToForms();
    this.setLoadingStates();
  },

  refreshData() {
    console.debug('AdminsInvitationsStore::refreshData');
    AdminsInvitationsActions.fetchInvitations();
  },

  selectAllAdminsInvitations() {
    this.getPendingInvitations().forEach((item) => item.checked = true);
    this.trigger(this.data);
  },

  setInvitations(items) {
    console.debug('AdminsInvitationsStore::setInvitations');

    this.data.items = Object.keys(items).map((key) => items[key]);
    this.data.hideDialogs = false;
    this.trigger(this.data);
  },

  getPendingInvitations() {
    console.debug('AdminsInvitationsStore::getPendingInvitations');

    let isInvitationPending = (element) => element.state === 'new';
    let pendingInvitations = this.data.items.filter(isInvitationPending);

    return pendingInvitations;
  },

  onFetchInvitations() {
    this.trigger(this.data);
  },

  onFetchInvitationsCompleted(items) {
    console.debug('AdminsInvitationsStore::onGetInstanesCompleted');
    this.data.items = Object.keys(items).map((item) => items[item]);
    AdminsInvitationsActions.setInvitations(items);
  },

  onRemoveInvitationCompleted() {
    this.refreshData();
    ColumnMenuActions.clearClickedItem();
  },

  onResendInvitationCompleted() {
    this.data.hideDialogs = false;
    this.trigger(this.data);
    AdminsInvitationsActions.uncheckAll();
    ColumnMenuActions.clearClickedItem();
  }
});
