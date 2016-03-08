import _ from 'lodash';

export default {
  list(params = {}) {
    _.defaults(params, {ordering: 'desc'});
    this.Connection
      .AccountInvitations
      .list(params)
      .then(this.completed)
      .catch(this.failure);
  },

  accept(items) {
    if (typeof items === 'string') {
      this.Connection
        .AccountInvitations
        .accept(items)
        .then(this.completed)
        .catch(this.failure);
    } else {
      let promises = items.map((item) => this.Connection.AccountInvitations.accept(item.key));

      this.Promise.all(promises)
        .then(this.completed)
        .error(this.failure);
    }
  },

  decline(items) {
    let promises = items.map((item) => this.Connection.AccountInvitations.remove(item.id));

    this.Promise.all(promises)
      .then(this.completed)
      .error(this.failure);
  }
};
