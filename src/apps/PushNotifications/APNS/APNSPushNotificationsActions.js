import CreateActions from '../../../utils/ActionsConstructor';

export default CreateActions(
  {
    fetch: {},
    setDevices: {},
    fetchAPNSPushNotificationConfig: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushNotifications.getAPNSPushNotificationConfig'
    },
    configAPNSPushNotification: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushNotifications.configAPNSPushNotification'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
