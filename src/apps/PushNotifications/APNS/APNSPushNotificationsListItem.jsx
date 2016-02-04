import PushNotificationListItem from '../PushNotificationsListItem';

import APNSDevicesStore from '../../PushDevices/APNSDevices/APNSDevicesStore';
import APNSPushNotificationsActions from '../APNS/APNSPushNotificationsActions';

let item = {
  name: 'APNS',
  label: 'Apple Push Notification service (APNs)',
  getDevices: APNSDevicesStore.getDevices,
  devicesRoute: 'apns-devices',
  icon: 'apple',
  showConfigDialog: APNSPushNotificationsActions.showDialog
};

export default PushNotificationListItem('APNS', item);
