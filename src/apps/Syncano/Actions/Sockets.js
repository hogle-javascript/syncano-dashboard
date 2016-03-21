import _ from 'lodash';

export default {
  list(params = {}) {
    _.defaults(params, {ordering: 'desc'});

    const {instance} = this.Connection.getInfo();
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
      'apnsDevices',
      'scripts',
      'classes'
    ];
    const requests = [
      {method: 'GET', path: `/v1/instances/${instance.name}/api/objects/?${query}`},
      {method: 'GET', path: `/v1/instances/${instance.name}/webhooks/?${query}`},
      {method: 'GET', path: `/v1/instances/${instance.name}/triggers/?${query}`},
      {method: 'GET', path: `/v1/instances/${instance.name}/schedules/?${query}`},
      {method: 'GET', path: `/v1/instances/${instance.name}/channels/?${query}`},
      {method: 'GET', path: `/v1/instances/${instance.name}/push_notifications/gcm/config/?${query}`},
      {method: 'GET', path: `/v1/instances/${instance.name}/push_notifications/apns/config/?${query}`},
      {method: 'GET', path: `/v1/instances/${instance.name}/push_notifications/gcm/devices/?${query}`},
      {method: 'GET', path: `/v1/instances/${instance.name}/push_notifications/apns/devices/?${query}`},
      {method: 'GET', path: `/v1/instances/${instance.name}/codeboxes/?${query}`},
      {method: 'GET', path: `/v1/instances/${instance.name}/classes/?${query}`}
    ];

    this.Connection
      .request('POST', `v1/instances/${instance.name}/batch/`, {requests, serialize: false})
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
