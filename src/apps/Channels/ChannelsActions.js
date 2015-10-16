import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    setChannels: {},
    fetchChannels: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Channels.list'
    },
    createChannel: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Channels.create'
    },
    updateChannel: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Channels.update'
    },
    removeChannels: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Channels.remove'
    }
  },
  {
    withDialog: true,
    withCheck: true
  }
);
