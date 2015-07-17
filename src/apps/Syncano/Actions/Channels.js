export default {
  fetchChannels() {
    this.Connection
      .Channels
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  createChannel(payload) {
    this.Connection
      .Channels.create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  updateChannel(channelName, params) {
    this.Connection
      .Channels.update(channelName, params)
      .then(this.completed)
      .catch(this.failure);
  },

  removeChannels(names) {
    let promises = names.map(id => {
      return this.Connection.Channels.remove(id);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  }
};
