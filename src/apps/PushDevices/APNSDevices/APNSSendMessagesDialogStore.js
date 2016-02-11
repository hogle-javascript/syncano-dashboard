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

  getInitialState() {
    return {
      label: null,
      user_id: null,
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

  onSendMessagesToAPNS() {
    console.debug('APNSDeviceDialogStore::onSendMessageToAPNS');
    console.error('sendMessageAPNS');
  },

  onSendMessagesToAPNSCompleted() {
    this.dismissDialog();
    console.debug('APNSDeviceDialogStore::onSendMessageToAPNSCompleted');
    console.error('sendMessageAPNSCompleted');
  }
});
