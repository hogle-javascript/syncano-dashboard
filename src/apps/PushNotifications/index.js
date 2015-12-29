import PushNotifications from './PushNotifications';
import Devices from './Devices';
import GCMDevices from './GCMDevices';
import APNsDevices from './APNsDevices';

PushNotifications.Devices = Devices;
PushNotifications.Devices.GCM = GCMDevices;
PushNotifications.Devices.APNs = APNsDevices;

export default PushNotifications;
