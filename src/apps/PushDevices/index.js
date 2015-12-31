import Devices from './Devices';
import DevicesList from './DevicesList';
import DevicesListItem from './DevicesListItem';
import DeviceDialog from './DeviceDialog';
import DevicesActions from './DevicesActions';
import GCMDevicesStore from './GCMDevicesStore';
import APNsDevicesStore from './APNsDevicesStore';
import DeviceDialogStore from './DeviceDialogStore';

Devices.List = DevicesList;
Devices.ListItem = DevicesListItem;
Devices.Actions = DevicesActions;
Devices.GCMStore = GCMDevicesStore;
Devices.APNsStore = APNsDevicesStore;
Devices.Dialog = DeviceDialog;
Devices.DialogStore = DeviceDialogStore;

export default Devices;
