import _ from 'lodash';

export default {
  list(params = {}) {
    _.defaults(params, {ordering: 'desc'});

    const {instance} = this.Connection.getInfo();
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
      {method: 'GET', path: `/v1/instances/${instance.name}/api/objects/`},
      {method: 'GET', path: `/v1/instances/${instance.name}/webhooks/`},
      {method: 'GET', path: `/v1/instances/${instance.name}/triggers/`},
      {method: 'GET', path: `/v1/instances/${instance.name}/schedules/`},
      {method: 'GET', path: `/v1/instances/${instance.name}/channels/`},
      {method: 'GET', path: `/v1/instances/${instance.name}/push_notifications/gcm/config/`},
      {method: 'GET', path: `/v1/instances/${instance.name}/push_notifications/apns/config/`},
      {method: 'GET', path: `/v1/instances/${instance.name}/push_notifications/gcm/devices/`},
      {method: 'GET', path: `/v1/instances/${instance.name}/push_notifications/apns/devices/`},
      {method: 'GET', path: `/v1/instances/${instance.name}/codeboxes/`},
      {method: 'GET', path: `/v1/instances/${instance.name}/classes/`}
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
