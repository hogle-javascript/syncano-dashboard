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
    },
    createAPNsDevice: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushNotifications.createAPNsDevice'
    },
    updateAPNsDevice: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushNotifications.updateAPNsDevice'
    },
    createGCMDevice: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushNotifications.createGCMDevice'
    },
    updateGCMDevice: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushNotifications.updateGCMDevice'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
