import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    fetch: {},
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
    removeAPNsDevices: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushNotifications.removeAPNsDevices'
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
    },
    removeGCMDevices: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushNotifications.removeGCMDevices'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
