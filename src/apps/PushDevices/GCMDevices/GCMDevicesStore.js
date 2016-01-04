import Reflux from 'reflux';

// Utils & Mixins
import {CheckListStore, WaitForStore, StoreHelpers} from '../../../mixins';

// Stores & Actions
import Actions from '../DevicesActions';
import SessionActions from '../../Session/SessionActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    CheckListStore,
    WaitForStore,
    StoreHelpers
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
      SessionActions.setInstance,
      this.refreshData
    );
  },

  getDevices(empty) {
    return this.data.items || empty || null;
  },

  setDevices(devices) {
    console.debug('GCMDevicesStore::setGCMDevices');
    this.data.items = devices;
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  refreshData() {
    console.debug('GCMDevicesStore::refreshData');
    Actions.fetchGCMDevices();
  },

  onFetchGCMDevices() {
    console.debug('GCMDevicesStore::onFetchGCMDevices');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchGCMDevicesCompleted(devices) {
    console.debug('GCMDevicesStore::onFetchGCMDevicesCompleted');
    let items = this.saveListFromSyncano(devices);

    this.setDevices(items);
  },

  onRemoveGCMDevices() {
    console.debug('GCMDevicesStore::onRemoveGCMDevices');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onRemoveGCMDevicesCompleted() {
    console.debug('GCMDevicesStore::onRemoveGCMDevicesCompleted');
    this.data.isLoading = false;
    this.data.hideDialogs = true;
    this.refreshData();
  }
});
