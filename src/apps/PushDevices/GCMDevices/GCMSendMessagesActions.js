import CreateActions from '../../../utils/ActionsConstructor';

export default CreateActions(
  {
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
