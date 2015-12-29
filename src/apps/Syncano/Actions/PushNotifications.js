import _ from 'lodash';

export default {
  listDevices(deviceType, params = {}) {
    _.defaults(params, {ordering: 'desc'});
    this.Connection
      .PushNotifications
      .listDevices(deviceType, params)
      .then(this.completed)
      .catch(this.failure);
  }
};
