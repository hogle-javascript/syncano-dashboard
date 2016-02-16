import PushNotificationsList from './PushNotificationsList';
import PushNotificationsListItem from './PushNotificationsListItem';
import APNSPushNotificationsListItem from './APNS/APNSPushNotificationsListItem';
import APNSPushNotificationsActions from './APNS/APNSPushNotificationsActions';
import APNSPushNotificationsStore from './APNS/APNSPushNotificationsStore';
import APNSConfigDialog from './APNS/APNSConfigDialog';
import APNSDialogStore from './APNS/APNSConfigDialogStore';
import GCMPushNotificationsListItem from './GCM/GCMPushNotificationsListItem';
import GCMPushNotificationsActions from './GCM/GCMPushNotificationsActions';
import GCMPushNotificationsStore from './GCM/GCMPushNotificationsStore';
import GCMConfigDialog from './GCM/GCMConfigDialog';
import GCMDialogStore from './GCM/GCMConfigDialogStore';

let PushNotifications = {};

PushNotifications.List = PushNotificationsList;
PushNotifications.ListItem = PushNotificationsListItem;
PushNotifications.APNSListItem = APNSPushNotificationsListItem;
PushNotifications.APNSActions = APNSPushNotificationsActions;
PushNotifications.APNSStore = APNSPushNotificationsStore;
PushNotifications.APNSConfigDialog = APNSConfigDialog;
PushNotifications.APNSDialogStore = APNSDialogStore;
PushNotifications.GCMListItem = GCMPushNotificationsListItem;
PushNotifications.GCMActions = GCMPushNotificationsActions;
PushNotifications.GCMStore = GCMPushNotificationsStore;
PushNotifications.GCMConfigDialog = GCMConfigDialog;
PushNotifications.GCMDialogStore = GCMDialogStore;

export default PushNotifications;
