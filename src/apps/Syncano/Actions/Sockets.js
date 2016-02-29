import _ from 'lodash';

export default {
  list(params = {}) {
    _.defaults(params, {ordering: 'desc'});
    const promises = [
      this.Connection.DataViews.list(params),
      this.Connection.WebHooks.list(params),
      this.Connection.Triggers.list(params),
      this.Connection.Schedules.list(params),
      this.Connection.Channels.list(params),
      this.Connection.PushNotifications.GCM.get(),
      this.Connection.PushNotifications.APNS.get(),
      this.Connection.PushNotifications.Devices.list('gcm'),
      this.Connection.PushNotifications.Devices.list('apns'),
      this.Connection.CodeBoxes.list(params)
    ];

    this.D.all(promises)
      .then((sockets) => {
        return {
          data: sockets[0],
          scriptsSockets: sockets[1],
          triggers: sockets[2],
          schedules: sockets[3],
          channels: sockets[4],
          gcmPushNotifications: sockets[5],
          apnsPushNotifications: sockets[6],
          gcmDevices: sockets[7],
          apnsDevices: sockets[8],
          scripts: sockets[9]
        };
      })
      .success(this.completed)
      .error(this.failure);
  }
};
