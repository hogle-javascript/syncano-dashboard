export default {
  configGCMPushNotification(params = {}) {
    this.NewLibConnection
      .GCMConfig
      .please()
      .update({}, params)
      .then(this.completed)
      .catch(this.failure);
  },

  configAPNSPushNotification(params = {}) {
    this.NewLibConnection
      .APNSConfig
      .please()
      .update({}, params)
      .then(this.completed)
      .catch(this.failure);
  },

  getGCMPushNotificationConfig() {
    this.NewLibConnection
      .GCMConfig
      .please()
      .get()
      .then(this.completed)
      .catch(this.failure);
  },

  getAPNSPushNotificationConfig() {
    this.NewLibConnection
      .APNSConfig
      .please()
      .get()
      .then(this.completed)
      .catch(this.failure);
  },

  removeCertificate(params = {}) {
    this.NewLibConnection
      .APNSConfig
      .please()
      .removeCertificate(params)
      .then(this.completed)
      .catch(this.failure);
  },

  listGCMMessages() {
    this.NewLibConnection
      .GCMMessage
      .please()
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  listAPNSMessages() {
    this.NewLibConnection
      .APNSMessage
      .please()
      .list()
      .then(this.completed)
      .catch(this.failure);
  }
};
