import Reflux from 'reflux';

// Utils & Mixins
import {DialogStoreMixin, WaitForStoreMixin} from '../../../mixins';

// Stores & Actions
import SessionActions from '../../Session/SessionActions';
import Actions from './GCMPushNotificationsActions';

export default Reflux.createStore({
  listenables: Actions,

  mixins: [
    DialogStoreMixin,
    WaitForStoreMixin
  ],

  getInitialState() {
    return {
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
  },

  refreshData() {
    console.debug('GCMConfigDialogStore::refreshData');
    Actions.fetchGCMPushNotificationConfig();
  },

  onFetchGCMPushNotificationConfigCompleted(config) {
    console.debug('GCMConfigDialogStore::onFetchGCMPushNotificationConfigCompleted');
    this.data.production_api_key = config.production_api_key;
    this.data.development_api_key = config.development_api_key;
    this.trigger(this.data);
  },

  onConfigGCMPushNotificationCompleted() {
    console.debug('GCMConfigDialogStore::onConfigGCMPushNotification');
    this.dismissDialog();
    this.refreshData();
  }
});
