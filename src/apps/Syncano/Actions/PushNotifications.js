import _ from 'lodash';

export default {
  listGCMDevices(params = {}) {
    _.defaults(params, {ordering: 'desc'});
    this.Connection
      .PushNotifications
      .listDevices('gcm', params)
      .then(this.completed)
      .catch(this.failure);
  },
  listAPNsDevices(params = {}) {
    _.defaults(params, {ordering: 'desc'});
    this.Connection
      .PushNotifications
      .listDevices('apns', params)
      .then(this.completed)
      .catch(this.failure);
  }
};
