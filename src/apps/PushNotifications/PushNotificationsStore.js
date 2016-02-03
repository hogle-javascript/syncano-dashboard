import Reflux from 'reflux';

// Utils & Mixins
import {CheckListStoreMixin, WaitForStoreMixin, StoreHelpersMixin, StoreLoadingMixin} from '../../mixins';

// Stores & Actions
import Actions from './PushNotificationsActions';
import APNSDevicesActions from '../PushDevices/APNSDevices/APNSDevicesActions';
import APNSDevicesStore from '../PushDevices/APNSDevices/APNSDevicesStore';
import GCMDevicesActions from '../PushDevices/GCMDevices/GCMDevicesActions';
import GCMDevicesStore from '../PushDevices/GCMDevices/GCMDevicesStore';
import SessionActions from '../Session/SessionActions';

export default Reflux.createStore({
  listenables: [Actions],
  mixins: [
    CheckListStoreMixin,
    WaitForStoreMixin,
    StoreHelpersMixin,
    StoreLoadingMixin
  ],

  getInitialState() {
    return {
      items: []
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

  getItemsObjs() {
    this.data.items = [
      {
        label: 'Apple Push Notification service (APNs)',
        devicesCount: APNSDevicesStore.getDevices().length,
        route: 'apns-devices',
        icon: 'apple',
        configureDevice: APNSDevicesActions.showDialog
      },
      {
        label: 'Google Cloud Messaging (GCM)',
        devicesCount: GCMDevicesStore.getDevices().length,
        route: 'gcm-devices',
        icon: 'android',
        configureDevice: GCMDevicesActions.showDialog
      }
    ];

    return this.data.items;
  }
});
