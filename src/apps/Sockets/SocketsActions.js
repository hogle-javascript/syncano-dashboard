import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    setSockets: {},
    clearSockets: {},
    addSocketsListeners: {},
    removeSocketsListeners: {},

    fetchSockets: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Sockets.list'
    }
  },
  {
    withCheck: true
  }
);
