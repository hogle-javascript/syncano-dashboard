import _ from 'lodash';

export default {
  list(params = {}) {
    _.defaults(params, {ordering: 'desc'});
    this.Connection
      .Classes
      .list(params)
      .then(this.completed)
      .catch(this.failure);
  },

  get(className) {
    this.Connection
      .Classes
      .get(className)
      .then(this.completed)
      .catch(this.failure);
  },

  create(payload) {
    this.Connection
      .Classes
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  update(classname, payload) {
    this.Connection
      .Classes
      .update(classname, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  remove(classnames) {
    let promises = classnames.map((classname) => this.Connection.Classes.remove(classname));

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  }
};
