import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    setDataEndpoints: {},
    fetchDataEndpoints: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataEndpoints.list'
    },
    createDataEndpoint: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataEndpoints.create'
    },
    createDataEndpointWithClass: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataEndpoints.createWithClass'
    },
    updateDataEndpoint: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataEndpoints.update'
    },
    removeDataEndpoints: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataEndpoints.remove'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
