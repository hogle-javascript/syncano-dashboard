import Constants from '../../../constants/Constants';
import _ from 'lodash';

export default {
  list(params = {}) {
    _.defaults(params, {
      page_size: Constants.DATAOBJECTS_PAGE_SIZE,
      order_by: '-created_at'
    });
    this.Connection
      .DataObjects
      .list(params)
      .then(this.completed)
      .catch(this.failure);
  },

  subList(payload) {
    this.Connection
      .DataObjects
      .list(payload.className, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  create(payload) {
    this.NewLibConnection
      .DataObject
      .please()
      .create(payload)
      .then((createdObject) => {
        const promises = _.map(payload.fileFields, (file) =>
          this.NewLibConnection
            .DataObject
            .please()
            .update({
              className: payload.className,
              id: createdObject.id
            }, {[file.name]: this.NewLibConnection.file(file.file)}));

        this.Promise.all(promises)
          .then(this.completed)
          .catch(this.failure);
      })
      .catch(this.failure);
  },

  update(payload) {
    this.NewLibConnection
      .DataObject
      .please()
      .update({className: payload.className, id: payload.id}, payload)
      .then((updatedObject) => {
        const promises = _.map(payload.fileFields, (file) =>
          this.NewLibConnection
            .DataObject
            .please()
            .update({
              className: payload.className,
              id: updatedObject.id
            }, {[file.name]: this.NewLibConnection.file(file.file)}));

        this.Promise.all(promises)
          .then(this.completed)
          .catch(this.failure);
      })
      .catch(this.failure);
  },

  remove(className, ids) {
    const promises = _.map(ids, (id) =>
      this.NewLibConnection
        .DataObject
        .please()
        .delete({className, id}));

    this.Promise.all(promises)
      .then(this.completed)
      .error(this.failure);
  },

  getClass(name) {
    this.NewLibConnection
      .Class
      .please()
      .get({name})
      .then(this.completed)
      .catch(this.failure);
  }
};
