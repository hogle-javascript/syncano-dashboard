import PushNotificationListItem from '../PushNotificationsListItem';

import GCMDevicesStore from '../../PushDevices/GCMDevices/GCMDevicesStore';
import GCMPushNotificationsActions from '../GCM/GCMPushNotificationsActions';

let item = {
  name: 'GCM',
  label: 'Google Cloud Messaging (GCM)',
  getDevices: GCMDevicesStore.getDevices,
  devicesRoute: 'gcm-devices',
  showConfigDialog: GCMPushNotificationsActions.showDialog
};

export default PushNotificationListItem('GCM', item);
