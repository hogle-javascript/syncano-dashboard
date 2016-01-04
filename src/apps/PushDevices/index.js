import Devices from './Devices';
import APNSDevices from './APNSDevices/APNSDevices';
import GCMDevices from './GCMDevices/GCMDevices';
import DevicesList from './DevicesList';
import DevicesListItem from './DevicesListItem';
import DeviceDialog from './DeviceDialog';
import APNSDeviceDialog from './APNSDevices/APNSDeviceDialog';
import GCMDeviceDialog from './GCMDevices/GCMDeviceDialog';
import DevicesActions from './DevicesActions';
import GCMDevicesStore from './GCMDevices/GCMDevicesStore';
import APNSDevicesStore from './APNSDevices/APNSDevicesStore';
import DeviceDialogStore from './DeviceDialogStore';

Devices.APNS = APNSDevices;
Devices.GCM = GCMDevices;
Devices.List = DevicesList;
Devices.ListItem = DevicesListItem;
Devices.Actions = DevicesActions;
Devices.GCMStore = GCMDevicesStore;
Devices.APNSStore = APNSDevicesStore;
Devices.Dialog = DeviceDialog;
Devices.GCMDialog = GCMDeviceDialog;
Devices.APNSDialog = APNSDeviceDialog;
Devices.DialogStore = DeviceDialogStore;

export default Devices;
