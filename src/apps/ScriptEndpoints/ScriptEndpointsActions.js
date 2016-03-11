import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    setScriptEndpoints: {},
    fetchScriptEndpoints: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.ScriptEndpoints.list'
    },
    createScriptEndpoint: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.ScriptEndpoints.create'
    },
    updateScriptEndpoint: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.ScriptEndpoints.update'
    },
    removeScriptEndpoints: {
      loading: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.ScriptEndpoints.remove'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
