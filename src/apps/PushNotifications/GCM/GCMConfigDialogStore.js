import Reflux from 'reflux';

// Utils & Mixins
import {DialogStoreMixin, WaitForStoreMixin, StoreLoadingMixin} from '../../../mixins';

// Stores & Actions
import SessionActions from '../../Session/SessionActions';
import Actions from './GCMPushNotificationsActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    DialogStoreMixin,
    WaitForStoreMixin,
    StoreLoadingMixin
  ],

  getInitialState() {
    return {
      isCertLoading: true,
      production_api_key: null,
      development_api_key: null
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

  refreshData() {
    console.debug('GCMConfigDialogStore::refreshData');
    Actions.fetchGCMPushNotificationConfig();
  },

  onSetGCMApiKey(type, value) {
    this.data[`${type}_api_key`] = value;
    this.trigger({[`${type}_api_key`]: value});
  },

  onFetchGCMPushNotificationConfig() {
    this.data.isCertLoading = true;
    this.trigger(this.data);
  },

  onFetchGCMPushNotificationConfigCompleted(config) {
    console.debug('GCMConfigDialogStore::onFetchGCMPushNotificationConfigCompleted');
    this.data.production_api_key = config.production_api_key;
    this.data.development_api_key = config.development_api_key;
    this.data.isCertLoading = false;
    this.trigger(this.data);
  },

  onConfigGCMPushNotificationCompleted() {
    console.debug('GCMConfigDialogStore::onConfigGCMPushNotificationCompleted');
    this.dismissDialog();
    this.refreshData();
  }
});
