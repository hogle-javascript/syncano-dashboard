export default {
  listAPNSDevices() {
    this.NewLibConnection
      .APNSDevice
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  createAPNSDevice(payload) {
    this.NewLibConnection
      .APNSDevice
      .please()
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  updateAPNSDevice(registrationId, payload) {
    this.NewLibConnection
      .APNSDevice
      .please()
      .update({ registration_id: registrationId }, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeAPNSDevices(devices) {
    const promises = devices.map((device) => {
      return this.NewLibConnection
        .APNSDevice
        .please()
        .delete({ registration_id: device.registration_id });
    });

    this.Promise.all(promises)
      .then(this.completed)
      .catch(this.failure);
  },

  sendMessagesToAPNS(content) {
    const instanceName = this.NewLibConnection.getInstanceName();
    const accountKey = this.NewLibConnection.getAccountKey();
    const params = {
      method: 'post',
      url: `${SYNCANO_BASE_URL}v1.1/instances/${instanceName}/push_notifications/apns/messages/?api_key=${accountKey}`,
      data: { content }
    };

    this.Promise
      .request(params)
      .then(this.completed)
      .catch(this.failure);
  },

  listGCMDevices() {
    this.NewLibConnection
      .GCMDevice
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  createGCMDevice(payload) {
    this.NewLibConnection
      .GCMDevice
      .please()
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  updateGCMDevice(registrationId, payload) {
    this.NewLibConnection
      .GCMDevice
      .please()
      .update({ registration_id: registrationId }, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeGCMDevices(devices) {
    const promises = devices.map((device) => {
      return this.NewLibConnection
        .GCMDevice
        .please()
        .delete({ registration_id: device.registration_id });
    });

    this.Promise.all(promises)
      .then(this.completed)
      .catch(this.failure);
  },

  sendMessagesToGCM(content) {
    const instanceName = this.NewLibConnection.getInstanceName();
    const accountKey = this.NewLibConnection.getAccountKey();
    const params = {
      method: 'post',
      url: `${SYNCANO_BASE_URL}v1.1/instances/${instanceName}/push_notifications/gcm/messages/?api_key=${accountKey}`,
      data: { content }
    };

    this.Promise
      .request(params)
      .then(this.completed)
      .catch(this.failure);
  }
};
