import Reflux from 'reflux';

// Utils & Mixins
import {StoreFormMixin, DialogStoreMixin, StoreLoadingMixin} from '../../../mixins';

// Stores & Actions
import Actions from './APNSSendMessagesActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    StoreFormMixin,
    DialogStoreMixin,
    StoreLoadingMixin
  ],

  config: {
    type: 'APNS',
    icon: 'synicon-apple',
    device: 'iOS'
  },

  getInitialState() {
    return {
      isLoading: false
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

  onSendMessagesToAPNSCompleted() {
    console.debug('APNSDeviceDialogStore::onSendMessageToAPNSCompleted');
    this.trigger(this.data);
    this.dismissDialog();
  }
});
