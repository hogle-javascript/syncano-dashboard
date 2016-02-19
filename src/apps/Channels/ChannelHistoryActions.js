import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions({
  setCurrentObjectId: {},
  fetchChannelListHistory: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Channels.getHistory'
  },

  fetchCurrentChannel: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Channels.get'
  }

});
