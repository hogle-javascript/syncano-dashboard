import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    setCodeBoxes: {},

    createCodeBox: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CodeBoxes.create'
    },
    fetchCodeBoxes: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CodeBoxes.list'
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
