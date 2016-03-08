import _ from 'lodash';

export default {
  list(params = {}) {
    _.defaults(params, {ordering: 'desc'});
    this.Connection
      .Invitations
      .list(params)
      .then(this.completed)
      .catch(this.failure);
  },

  create(payload) {
    this.Connection
      .Invitations
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  remove(items) {
    let promises = items.map((item) => this.Connection.Invitations.remove(item.id));

    this.Promise.all(promises)
      .then(this.completed)
      .error(this.failure);
  },

  resend(items) {
    let promises = items.map((item) => this.Connection.Invitations.resend(item.id));

    this.Promise.all(promises)
      .then(this.completed)
      .error(this.failure);
  }
};
