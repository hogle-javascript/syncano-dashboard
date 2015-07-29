import CreateActions from '../../utils/ActionsConstructor.js'

export default CreateActions(
  {},
  {
    checkItem     : {},
    uncheckAll    : {},
    selectAll     : {},
    fetch         : {},
    setApiKeys    : {},
    showDialog    : {},
    dismissDialog : {},
    fetchApiKeys: {
      asyncResult: true,
      loading    : true,
      children    : ['completed', 'failure'],
      method: 'Syncano.Actions.ApiKeys.list'
    },
    createApiKey: {
      asyncResult : true,
      asyncForm   : true,
      loading     : true,
      children    : ['completed', 'failure'],
      method: 'Syncano.Actions.ApiKeys.create'
    },
    updateApiKey: {
      asyncResult : true,
      asyncForm   : true,
      loading     : true,
      children    : ['completed', 'failure'],
      method: 'Syncano.Actions.ApiKeys.update'
    },
    removeApiKeys: {
      asyncResult : true,
      loading     : true,
      children    : ['completed', 'failure'],
      method: 'Syncano.Actions.ApiKeys.remove'
    },
    resetApiKey: {
      asyncResult : true,
      loading     : true,
      children    : ['completed', 'failure'],
      method: 'Syncano.Actions.ApiKeys.reset'
    }
  }
);
