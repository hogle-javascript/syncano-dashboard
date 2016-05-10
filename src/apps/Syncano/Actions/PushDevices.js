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
      .update({registration_id: registrationId}, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeAPNSDevices(devices) {
    const promises = devices.map((device) => {
      return this.NewLibConnection
        .APNSDevice
        .please()
        .delete({registration_id: device.registration_id});
    });

    this.Promise.all(promises)
      .then(this.completed)
      .error(this.failure);
  },

  sendMessagesToAPNS(registrationIds, payload) {
    const promises = registrationIds.map((registrationId) =>
      this.NewLibConnection
        .APNSDevice
        .please()
        .sendMessage({registration_id: registrationId}, payload));

    this.Promise.all(promises)
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
      .update({registration_id: registrationId}, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeGCMDevices(devices) {
    const promises = devices.map((device) => {
      return this.NewLibConnection
        .GCMDevice
        .please()
        .delete({registration_id: device.registration_id});
    });

    this.Promise.all(promises)
      .then(this.completed)
      .error(this.failure);
  },

  sendMessagesToGCM(registrationIds, payload) {
    const promises = registrationIds.map((registrationId) =>
      this.NewLibConnection
        .GCMDevice
        .please()
        .sendMessage({registration_id: registrationId}, payload)
    );

    this.Promise.all(promises)
      .then(this.completed)
      .catch(this.failure);
  }
};
