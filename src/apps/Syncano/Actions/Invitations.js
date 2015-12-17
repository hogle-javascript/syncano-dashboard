import _ from 'lodash';

export default {
  list(params = {}) {
    if (!_.keys(params).includes('ordering')) {
      _.assign(params, {ordering: 'desc'});
    }
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

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  resend(items) {
    let promises = items.map((item) => this.Connection.Invitations.resend(item.id));

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  }
};
