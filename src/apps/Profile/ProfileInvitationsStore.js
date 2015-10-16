import Reflux from 'reflux';

import Mixins from '../../mixins';

import SessionActions from '../Session/SessionActions';
import InstancesActions from '../Instances/InstancesActions';
import Actions from './ProfileInvitationsActions';

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
      isLoading: true
    };
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      this.refreshData
    );
    this.setLoadingStates();
  },

  refreshData() {
    console.debug('ProfileInvitationsStore::refreshData');
    Actions.fetchInvitations();
  },

  getInviations(empty) {
    return this.data.items || empty || null;
  },

  setInvitations(items) {
    this.data.items = Object.keys(items).map((key) => items[key]);
    this.trigger(this.data);
  },

  onFetchInvitations() {
    console.debug('ProfileInvitationsStore::onFetchInvitations');
    this.trigger(this.data);
  },

  onFetchInvitationsCompleted(items) {
    console.debug('ProfileInvitationsStore::onFetchInvitationsCompleted');
    Actions.setInvitations(items);
  },

  onFetchInvitationsFailure() {
    console.debug('ProfileInvitationsStore::onFetchInvitationsFailure');
    this.trigger(this.data);
  },

  onAcceptInvitationsCompleted() {
    InstancesActions.fetch();
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onAcceptInvitationsFailure() {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onDeclineInvitationsCompleted() {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onDeclineInvitationsFailure() {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  }
});
