import Reflux from 'reflux';

// Utils & Mixins
import {StoreFormMixin, DialogStoreMixin, StoreLoadingMixin} from '../../../mixins';

// Stores & Actions
import Actions from './GCMSendMessagesActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    StoreFormMixin,
    DialogStoreMixin,
    StoreLoadingMixin
  ],

  config: {
    type: 'GCM',
    icon: 'synicon-android',
    device: 'Android'
  },

  getInitialState() {
    return {
      label: null,
      user: null,
      registration_id: null,
      device_id: null,
      is_active: true
    };
  },

  init() {
    this.data = this.getInitialState();
    this.listenToForms();
    this.setLoadingStates();
  },

  getConfig() {
    return this.config;
  },

  onSendMessagesToGCMCompleted() {
    console.debug('GCMDeviceDialogStore::onSendMessageToGCMCompleted');
    this.dismissDialog();
  }
});
