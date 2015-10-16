import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions({
  setCurrentCodeBoxTraces: {},
  setCurrentCodeBoxId: {},
  setCurrentCodeBox: {},
  fetch: {},

  runCodeBoxWithUpdate: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.CodeBoxes.runWithUpdate'
  },

  fetchCodeBox: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.CodeBoxes.get'
  },

  updateCodeBox: {
    asyncResult: true,
    asyncForm: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.CodeBoxes.update'
  },

  runCodeBox: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.CodeBoxes.run'
  },

  fetchCodeBoxTraces: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.CodeBoxes.listTraces'
  }
});
