import Reflux from 'reflux';

// Utils & Mixins
import {CheckListStoreMixin, WaitForStoreMixin, StoreHelpersMixin, StoreLoadingMixin} from '../../../mixins';

// Stores & Actions
import Actions from './APNSDevicesActions';
import SessionActions from '../../Session/SessionActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    CheckListStoreMixin,
    WaitForStoreMixin,
    StoreHelpersMixin,
    StoreLoadingMixin
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
    console.debug('APNSDevicesStore::setDevices');
    this.data.items = devices;
    this.trigger(this.data);
  },

  refreshData() {
    console.debug('APNSDevicesStore::refreshData');
    Actions.fetchDevices();
  },

  onFetchDevicesCompleted(devices) {
    console.debug('APNSDevicesStore::onFetchDevicesCompleted');
    let items = this.saveListFromSyncano(devices);

    Actions.setDevices(items);
  },

  onRemoveDevicesCompleted() {
    console.debug('APNSDevicesStore::onRemoveDevicesCompleted');
    this.refreshData();
  }
});
