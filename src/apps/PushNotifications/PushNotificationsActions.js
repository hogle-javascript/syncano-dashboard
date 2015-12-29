import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    fetch: {},
    setDevices: {},
    fetchDevices: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushNotifications.listDevices'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
