import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    fetch: {},
    fetchGCMDevices: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushDevices.listGCMDevices'
    },
    fetchAPNsDevices: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushDevices.listAPNsDevices'
    },
    createAPNsDevice: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushDevices.createAPNsDevice'
    },
    updateAPNsDevice: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushDevices.updateAPNsDevice'
    },
    removeAPNsDevices: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushDevices.removeAPNsDevices'
    },
    createGCMDevice: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushDevices.createGCMDevice'
    },
    updateGCMDevice: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushDevices.updateGCMDevice'
    },
    removeGCMDevices: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushDevices.removeGCMDevices'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
