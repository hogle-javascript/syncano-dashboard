import _ from 'lodash';

export default {
  list(params = {}) {
    _.defaults(params, {ordering: 'desc'});

    const instanceName = this.NewLibConnection.getInstanceName();
    const query = _.map(params, (value, key) => `${key}=${value}`).join('&');
    const keys = [
      'data',
      'scriptEndpoints',
      'triggers',
      'schedules',
      'channels',
      'gcmPushNotifications',
      'apnsPushNotifications',
      'gcmDevices',
      'apnsDevices'
    ];
    const requests = [
      {method: 'GET', path: `/v1.1/instances/${instanceName}/endpoints/data/?${query}`},
      {method: 'GET', path: `/v1.1/instances/${instanceName}/endpoints/scripts/?${query}`},
      {method: 'GET', path: `/v1.1/instances/${instanceName}/triggers/?${query}`},
      {method: 'GET', path: `/v1.1/instances/${instanceName}/schedules/?${query}`},
      {method: 'GET', path: `/v1.1/instances/${instanceName}/channels/?${query}`},
      {method: 'GET', path: `/v1.1/instances/${instanceName}/push_notifications/gcm/config/?${query}`},
      {method: 'GET', path: `/v1.1/instances/${instanceName}/push_notifications/apns/config/?${query}`},
      {method: 'GET', path: `/v1.1/instances/${instanceName}/push_notifications/gcm/devices/?${query}`},
      {method: 'GET', path: `/v1.1/instances/${instanceName}/push_notifications/apns/devices/?${query}`}
    ];

    this.Connection
      .request('POST', `v1.1/instances/${instanceName}/batch/`, {requests, serialize: false})
      .then((responses) => {
        return _.reduce(responses, (result, response, index) => {
          const key = keys[index];

          if (response.code === 200) {
            if (key === 'gcmPushNotifications' || key === 'apnsPushNotifications') {
              result[key] = response.content;
            } else {
              result[key] = this.Connection.createList(this.Connection, response.content);
            }
          } else {
            result[key] = this.Connection.createList(this.Connection, {objects: []});
          }

          return result;
        }, {});
      })
      .then(this.completed)
      .catch(this.failure);
  }
};
