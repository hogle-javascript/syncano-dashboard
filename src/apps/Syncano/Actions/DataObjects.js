import Constants from '../../../constants/Constants';
import _ from 'lodash';

export default {
  list(className, params = {}) {
    _.defaults(params, {
      page_size: Constants.DATAOBJECTS_PAGE_SIZE,
      order_by: '-created_at'
    });
    this.Connection
      .DataObjects
      .list(className, params)
      .then(this.completed)
      .catch(this.failure);
  },

  subList(payload) {
    this.Connection
      .DataObjects
      .list(payload.className, payload.params)
      .then(this.completed)
      .catch(this.failure);
  },

  create(payload) {
    this.Connection
      .DataObjects
      .create(payload.className, payload.params)
      .then((createdItem) => {
        const promises = payload.fileFields.map((file) => {
          return this.Connection.DataObjects.uploadFile(payload.className, createdItem, file);
        });

        this.Promise.all(promises)
          .then(this.completed)
          .error(this.failure);
      })
      .catch(this.failure);
  },

  update(payload) {
    this.Connection
      .DataObjects
      .update(payload.className, payload.params)
      .then((updatedItem) => {
        const promises = payload.fileFields.map((file) => {
          return this.Connection.DataObjects.uploadFile(payload.className, updatedItem, file);
        });

        this.Promise.all(promises)
          .then(this.completed)
          .error(this.failure);
      })
      .catch(this.failure);
  },

  remove(className, dataobjects) {
    const promises = dataobjects.map((dataobject) => this.Connection.DataObjects.remove(className, dataobject));

    this.Promise.all(promises)
      .then(this.completed)
      .error(this.failure);
  },

  getClass(className) {
    this.Connection
      .Classes
      .get(className)
      .then(this.completed)
      .catch(this.failure);
  }
};
