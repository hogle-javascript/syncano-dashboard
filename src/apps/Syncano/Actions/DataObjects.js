import Constants from '../../../constants/Constants';
import _ from 'lodash';

let next = null;

export default {
  list() {
    this.NewLibConnection
      .DataObject
      .please()
      .list()
      .orderBy('created_at')
      .pageSize(Constants.DATAOBJECTS_PAGE_SIZE)
      .then((dataObjects) => {
        next = dataObjects.next;
        this.completed(dataObjects);
      })
      .catch(this.failure);
  },

  subList() {
    next()
      .then((dataObjects) => {
        next = dataObjects.next;
        this.completed(dataObjects);
      })
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
    this.NewLibConnection.defaults.className = name;
    this.NewLibConnection
      .Class
      .please()
      .get({name})
      .then(this.completed)
      .catch(this.failure);
  }
};
