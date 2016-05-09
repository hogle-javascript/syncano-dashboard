export default {
  configGCMPushNotification(params = {}) {
    this.Connection
      .PushNotifications
      .GCM
      .config(params)
      .then(this.completed)
      .catch(this.failure);
  },

  configAPNSPushNotification(params = {}) {
    this.Connection
      .PushNotifications
      .APNS
      .config(params)
      .then(this.completed)
      .catch(this.failure);
  },

  getGCMPushNotificationConfig(params = {}) {
    this.Connection
      .PushNotifications
      .GCM
      .get(params)
      .then(this.completed)
      .catch(this.failure);
  },

  getAPNSPushNotificationConfig(params = {}) {
    this.Connection
      .PushNotifications
      .APNS
      .get(params)
      .then(this.completed)
      .catch(this.failure);
  },

  removeCertificate(params = {}) {
    this.Connection
      .PushNotifications
      .APNS
      .removeCertificate(params)
      .then(this.completed)
      .catch(this.failure);
  }
};
