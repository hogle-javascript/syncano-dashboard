import Reflux from 'reflux';
import _ from 'lodash';

// Utils & Mixins
import {CheckListStoreMixin, WaitForStoreMixin, StoreHelpersMixin, StoreLoadingMixin} from '../../../mixins';

// Stores & Actions
import Actions from './GCMDevicesActions';
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
      hasConfig: false,
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

  isConfigured() {
    return this.data.hasConfig;
  },

  getDevices() {
    console.debug('GCMDevicesStore::getDevices');
    return this.data.items;
  },

  setDevices(devices) {
    console.debug('GCMDevicesStore::setGCMDevices');
    this.data.items = devices;
    this.trigger(this.data);
  },

  refreshData() {
    console.debug('GCMDevicesStore::refreshData');
    Actions.fetchGCMConfig();
    Actions.fetchDevices();
  },

  onFetchDevicesCompleted(devices) {
    console.debug('GCMDevicesStore::onFetchDevicesCompleted');
    Actions.setDevices(devices);
  },

  onRemoveDevicesCompleted() {
    console.debug('GCMDevicesStore::onRemoveDevicesCompleted');
    this.refreshData();
  },

  onFetchGCMConfigCompleted(config) {
    console.debug('GCMDevicesStore::onFetchGCMConfigCompleted');
    this.data.hasConfig = !_.isEmpty(config.development_api_key) || !_.isEmpty(config.production_api_key);
    this.trigger({hasConfig: this.data.hasConfig});
  }
});
