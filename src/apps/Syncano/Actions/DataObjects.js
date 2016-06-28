import Constants from '../../../constants/Constants';
import _ from 'lodash';
import PromiseSeries from 'promise-series';

export default {
  list(pageNumber = 1) {
    const series = new PromiseSeries();
    let allItems = [];

    series.add(() => {
      return this.NewLibConnection
        .DataObject
        .please()
        .list()
        .orderBy('-created_at')
        .pageSize(Constants.DATAOBJECTS_PAGE_SIZE)
        .then((items) => {
          allItems = [...allItems, ...items];

          return items;
        });
    });

    _.times((pageNumber - 1), () => {
      series.add((nextParams) => {
        return nextParams.next().then((items) => {
          allItems = [...allItems, ...items];

          return items;
        });
      });
    });

    series.add((rawData) => ({ allItems, rawData }));
    series.run()
      .then(this.completed)
      .catch(this.failure);
  },

  subList(nextParams) {
    nextParams.next()
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
            }, { [file.name]: this.NewLibConnection.file(file.file) }));

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
      .update({ className: payload.className, id: payload.id }, payload)
      .then((updatedObject) => {
        const promises = _.map(payload.fileFields, (file) =>
          this.NewLibConnection
            .DataObject
            .please()
            .update({
              className: payload.className,
              id: updatedObject.id
            }, { [file.name]: this.NewLibConnection.file(file.file) }));

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
        .delete({ className, id }));

    this.Promise.all(promises)
      .then(this.completed)
      .catch(this.failure);
  },

  getClass(name) {
    this.NewLibConnection.defaults.className = name;
    this.NewLibConnection
      .Class
      .please()
      .get({ name })
      .then(this.completed)
      .catch(this.failure);
  }
};
