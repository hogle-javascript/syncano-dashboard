import _ from 'lodash';

export default {
  list(params = {}) {
    _.defaults(params, {ordering: 'desc'});
    this.Connection
      .Channels
      .list(params)
      .then(this.completed)
      .catch(this.failure);
  },

  create(payload) {
    this.Connection
      .Channels.create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  update(channelName, params) {
    this.Connection
      .Channels.update(channelName, params)
      .then(this.completed)
      .catch(this.failure);
  },

  remove(names) {
    let promises = names.map((id) => this.Connection.Channels.remove(id));

    this.Promise.all(promises)
      .then(this.completed)
      .error(this.failure);
  },

  get(channelName) {
    this.Connection
      .Channels
      .get(channelName)
      .then(this.completed)
      .catch(this.failure);
  },

  getHistory(channelName) {
    this.Connection
      .Channels
      .getHistory(channelName, {ordering: 'desc'})
      .then(this.completed)
      .catch(this.failure);
  }
};
