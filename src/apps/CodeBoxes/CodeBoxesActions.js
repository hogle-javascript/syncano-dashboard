import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    setCodeBoxes: {},
    fetchCodeBoxes: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CodeBoxes.list'
    },
    createCodeBox: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CodeBoxes.create'
    },
    updateCodeBox: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CodeBoxes.update'
    },
    removeCodeBoxes: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CodeBoxes.remove'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
