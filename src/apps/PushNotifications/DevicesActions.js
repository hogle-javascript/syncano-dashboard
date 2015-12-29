import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    fetch: {},
    setGCMDevices: {},
    setAPNsDevices: {},
    fetchGCMDevices: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushNotifications.listGCMDevices'
    },
    fetchAPNsDevices: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushNotifications.listAPNsDevices'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
