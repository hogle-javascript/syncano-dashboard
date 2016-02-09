import CreateActions from '../../../utils/ActionsConstructor';

export default CreateActions(
  {
    fetch: {},
    setDevices: {},
    fetchDevices: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushDevices.listAPNSDevices'
    },
    createDevice: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushDevices.createAPNSDevice'
    },
    updateDevice: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushDevices.updateAPNSDevice'
    },
    removeDevices: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushDevices.removeAPNSDevices'
    },
    sendMessageToAPNS: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.PushDevices.sendMessageToAPNS'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
