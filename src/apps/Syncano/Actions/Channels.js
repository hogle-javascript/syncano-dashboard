export default {
  list() {
    this.NewLibConnection
      .Channel
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  create(payload) {
    this.NewLibConnection
      .Channel
      .please()
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  update(name, params) {
    this.NewLibConnection
      .Channel
      .please()
      .update({name}, params)
      .then(this.completed)
      .catch(this.failure);
  },

  remove(channels) {
    const promises = channels.map((channel) => this.NewLibConnection.Channel.please().delete({name: channel.name}));

    this.Promise.all(promises)
      .then(this.completed)
      .error(this.failure);
  },

  get(name) {
    this.NewLibConnection
      .Channel
      .please()
      .get({name})
      .then(this.completed)
      .catch(this.failure);
  },

  getHistory(name) {
    this.NewLibConnection
      .Channel
      .please()
      .history({name})
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  }
};
