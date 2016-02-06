export default {
  configGCMPushNotification(params = {}) {
    this.Connection
      .PushNotifications
      .GCM
      .config(params)
      .then(this.completed)
      .catch(this.failure);
  },
  configAPNSPushNotification(params = {}, file) {
    this.Connection
      .PushNotifications
      .APNS
      .config(params)
      .then(() => {
        this.Connection.PushNotifications.APNS.uploadCertificate(file)
          .then(this.completed)
          .catch(this.failure);
      })
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
  }
};
