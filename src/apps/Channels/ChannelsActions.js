let Reflux = require('reflux'),
  Syncano = require('../Session/Connection'),
  Connection = Syncano.get(),
  D = Syncano.D;

let ChannelsActions = Reflux.createActions({
  checkItem: {},
  uncheckAll: {},
  selectAll: {},
  fetch: {},
  setChannels: {},
  showDialog: {},
  dismissDialog: {},

  fetchChannels: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure']
  },
  createChannel: {
    asyncForm: true,
    asyncResult: true,
    children: ['completed', 'failure']
  },
  updateChannel: {
    asyncResult: true,
    asyncForm: true,
    children: ['completed', 'failure']
  },
  removeChannels: {
    asyncResult: true,
    children: ['completed', 'failure']
  },
});

ChannelsActions.fetchChannels.listen(function() {
  console.info('ChannelsActions::fetchChannels');
  Connection
    .Channels
    .list()
    .then(this.completed)
    .catch(this.failure);
});

ChannelsActions.createChannel.listen(function(payload) {
  console.info('ChannelsActions::createChannel');
  Connection
    .Channels.create(payload)
    .then(this.completed)
    .catch(this.failure);
});

ChannelsActions.updateChannel.listen(function(channelName, params) {
  console.info('ChannelsActions::updateChannel');
  Connection
    .Channels.update(channelName, params)
    .then(this.completed)
    .catch(this.failure);
});

ChannelsActions.removeChannels.listen(function(names) {
  console.info('ChannelsActions::removeChannels');
  let promises = names.map(function(id) {
    return Connection.Channels.remove(id);
  });

  D.all(promises)
    .success(this.completed)
    .error(this.failure);
});

module.exports = ChannelsActions;
