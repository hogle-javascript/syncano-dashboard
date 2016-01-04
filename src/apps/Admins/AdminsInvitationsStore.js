import Reflux from 'reflux';

// Utils & Mixins
import Mixins from '../../mixins';

// Stores & Actions
import Actions from './AdminsInvitationsActions';
import SessionActions from '../Session/SessionActions';

export default Reflux.createStore({
  listenables: Actions,
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
    };
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
    Actions.fetchInvitations();
  },

  selectAll() {
    this.getPendingInvitations().forEach((item) => item.checked = true);
    this.trigger(this.data);
  },

  setInvitations(items) {
    console.debug('AdminsInvitationsStore::setInvitations');
    this.data.items = items;
    this.trigger(this.data);
  },

  getPendingInvitations() {
    console.debug('AdminsInvitationsStore::getPendingInvitations');

    let isInvitationPending = (element) => element.state === 'new';
    let pendingInvitations = this.data.items.filter(isInvitationPending);

    return pendingInvitations;
  },

  onFetchInvitationsCompleted(items) {
    console.debug('AdminsInvitationsStore::onFetchInvitationsCompleted');
    Actions.setInvitations(items._items);
  },

  onRemoveInvitationCompleted() {
    this.data.hideDialogs = true;
    this.refreshData();
  },

  onResendInvitationCompleted() {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    Actions.uncheckAll();
  }
});
