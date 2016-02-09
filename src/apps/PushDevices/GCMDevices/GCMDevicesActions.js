import CreateActions from '../../../utils/ActionsConstructor';

export default CreateActions(
  {
    fetch: {},
    setDevices: {},
    fetchDevices: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushDevices.listGCMDevices'
    },
    createDevice: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushDevices.createGCMDevice'
    },
    updateDevice: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushDevices.updateGCMDevice'
    },
    removeDevices: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushDevices.removeGCMDevices'
    },
    sendMessageToGCM: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushDevices.sendMessageToGCM'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
