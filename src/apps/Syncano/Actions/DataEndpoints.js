import _ from 'lodash';

export default {
  create(payload) {
    this.NewLibConnection
      .DataEndpoint
      .please()
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  list() {
    this.NewLibConnection
      .DataEndpoint
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  update(name, payload) {
    this.NewLibConnection
      .DataEndpoint
      .please()
      .update({name}, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  remove(dataEndpoints) {
    const promises = _.map(dataEndpoints, (dataEndpoint) =>
      this.NewLibConnection
        .DataEndpoint
        .please()
        .delete({name: dataEndpoint.name}));

    this.Promise.all(promises)
      .then(this.completed)
      .error(this.failure);
  }
};
