import _ from 'lodash';

export default {
  listGCMDevices(params = {}) {
    _.defaults(params, {ordering: 'desc'});
    this.Connection
      .PushNotifications
      .Devices
      .list('gcm', params)
      .then(this.completed)
      .catch(this.failure);
  },
  listAPNSDevices(params = {}) {
    _.defaults(params, {ordering: 'desc'});
    this.Connection
      .PushNotifications
      .Devices
      .list('apns', params)
      .then(this.completed)
      .catch(this.failure);
  },
  createAPNSDevice(payload) {
    this.Connection
      .PushNotifications
      .Devices
      .create('apns', payload)
      .then(this.completed)
      .catch(this.failure);
  },
  updateAPNSDevice(payload) {
    this.Connection
      .PushNotifications
      .Devices
      .update('apns', payload)
      .then(this.completed)
      .catch(this.failure);
  },
  removeAPNSDevices(devices) {
    let promises = devices.map((device) => {
      return this.Connection
        .PushNotifications
        .Devices
        .remove('apns', device.registration_id);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },
  createGCMDevice(payload) {
    this.Connection
      .PushNotifications
      .Devices
      .create('gcm', payload)
      .then(this.completed)
      .catch(this.failure);
  },
  updateGCMDevice(payload) {
    this.Connection
      .PushNotifications
      .Devices
      .update('gcm', payload)
      .then(this.completed)
      .catch(this.failure);
  },
  removeGCMDevices(devices) {
    let promises = devices.map((device) => {
      return this.Connection
        .PushNotifications
        .Devices
        .remove('gcm', device.registration_id);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  }
};
