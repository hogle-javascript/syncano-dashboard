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

  getDevices() {
    console.debug('APNSDevicesStore::getDevices');
    return this.data.items;
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
    Actions.setDevices(devices);
  },

  onRemoveDevicesCompleted() {
    console.debug('APNSDevicesStore::onRemoveDevicesCompleted');
    this.refreshData();
  }
});
