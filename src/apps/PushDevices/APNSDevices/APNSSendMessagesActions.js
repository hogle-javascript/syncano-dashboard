import CreateActions from '../../../utils/ActionsConstructor';

export default CreateActions(
  {
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
