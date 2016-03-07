import _ from 'lodash';

export default {
  list(params = {}) {
    _.defaults(params, {ordering: 'desc'});
    this.Connection
      .Admins
      .list(params)
      .then(this.completed)
      .catch(this.failure);
  },

  update(name, payload) {
    this.Connection
      .Admins
      .update(name, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  remove(admins) {
    let promises = admins.map((admin) => this.Connection.Admins.remove(admin));

    this.Bluebird.all(promises)
      .then(this.completed)
      .error(this.failure);
  }
};
