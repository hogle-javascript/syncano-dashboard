import PushNotifications from './PushNotifications';
import Devices from './Devices';
import DevicesList from './DevicesList';
import DevicesListItem from './DevicesListItem';
import DeviceDialog from './DeviceDialog';
import DevicesActions from './DevicesActions';
import GCMDevicesStore from './GCMDevicesStore';
import APNsDevicesStore from './APNsDevicesStore';
import DeviceDialogStore from './DeviceDialogStore';

PushNotifications.Devices = Devices;
PushNotifications.Devices.List = DevicesList;
PushNotifications.Devices.ListItem = DevicesListItem;
PushNotifications.Devices.Actions = DevicesActions;
PushNotifications.Devices.GCMStore = GCMDevicesStore;
PushNotifications.Devices.APNsStore = APNsDevicesStore;
PushNotifications.Devices.Dialog = DeviceDialog;
PushNotifications.Devices.DialogStore = DeviceDialogStore;

export default PushNotifications;
