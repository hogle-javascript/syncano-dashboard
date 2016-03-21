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
    const promises = devices.map((device) => {
      return this.Connection
        .PushNotifications
        .Devices
        .remove('apns', device.registration_id);
    });

    this.Promise.all(promises)
      .then(this.completed)
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
    const promises = devices.map((device) => {
      return this.Connection
        .PushNotifications
        .Devices
        .remove('gcm', device.registration_id);
    });

    this.Promise.all(promises)
      .then(this.completed)
      .error(this.failure);
  },

  sendMessagesToGCM(payload) {
    this.Connection
      .PushNotifications
      .GCM
      .sendMessages(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  sendMessagesToAPNS(payload) {
    this.Connection
      .PushNotifications
      .APNS
      .sendMessages(payload)
      .then(this.completed)
      .catch(this.failure);
  }
};
