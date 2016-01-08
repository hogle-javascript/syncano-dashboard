import Reflux from 'reflux';

// Utils & Mixins
import {CheckListStore, WaitForStore, StoreHelpers, StoreLoading} from '../../../mixins';

// Stores & Actions
import Actions from './GCMDevicesActions';
import SessionActions from '../../Session/SessionActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    CheckListStore,
    WaitForStore,
    StoreHelpers,
    StoreLoading
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
    this.setLoadingStates();
  },

  setDevices(devices) {
    console.debug('GCMDevicesStore::setGCMDevices');
    this.data.items = devices;
    this.trigger(this.data);
  },

  refreshData() {
    console.debug('GCMDevicesStore::refreshData');
    Actions.fetchDevices();
  },

  onFetchDevicesCompleted(devices) {
    console.debug('GCMDevicesStore::onFetchDevicesCompleted');
    let items = this.saveListFromSyncano(devices);

    Actions.setDevices(items);
  },

  onRemoveDevicesCompleted() {
    console.debug('GCMDevicesStore::onRemoveDevicesCompleted');
    this.refreshData();
  }
});
