import Devices from './Devices';
import APNsDevices from './APNsDevices/APNsDevices';
import GCMDevices from './GCMDevices/GCMDevices';
import DevicesList from './DevicesList';
import DevicesListItem from './DevicesListItem';
import DeviceDialog from './DeviceDialog';
import APNsDeviceDialog from './APNsDevices/APNsDeviceDialog';
import GCMDeviceDialog from './GCMDevices/GCMDeviceDialog';
import DevicesActions from './DevicesActions';
import GCMDevicesStore from './GCMDevices/GCMDevicesStore';
import APNsDevicesStore from './APNsDevices/APNsDevicesStore';
import DeviceDialogStore from './DeviceDialogStore';

Devices.APNs = APNsDevices;
Devices.GCM = GCMDevices;
Devices.List = DevicesList;
Devices.ListItem = DevicesListItem;
Devices.Actions = DevicesActions;
Devices.GCMStore = GCMDevicesStore;
Devices.APNsStore = APNsDevicesStore;
Devices.Dialog = DeviceDialog;
Devices.GCMDialog = GCMDeviceDialog;
Devices.APNsDialog = APNsDeviceDialog;
Devices.DialogStore = DeviceDialogStore;

export default Devices;
