var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();


var DataObjectsActions = Reflux.createActions({
  checkItem  : {},
  uncheckAll : {},

  getDataObjects: {
      asyncResult: true,
      children: ['completed', 'failure']
  },
  createDataObject: {
      asyncResult: true,
      children: ['completed', 'failure']
  },
  updateDataObject: {
      asyncResult: true,
      children: ['completed', 'failure']
  },
  removeDataObjects: {
      asyncResult: true,
      children: ['completed', 'failure']
  }
});

DataObjectsActions.getDataObjects.listen( function(classname) {
  console.info('DataObjectsActions::getDataObjects');
  Connection
    .DataObjects
    .list(classname)
    .then(this.completed)
    .catch(this.failure);
});

DataObjectsActions.createDataObject.listen( function(payload) {
  console.info('DataObjectsActions::createDataObject', payload);
  Connection
    .DataObjects
    .create(payload)
    .then(this.completed)
    .catch(this.failure);
});


DataObjectsActions.updateDataObject.listen( function(id, payload) {
  console.info('DataObjectsActions::updateDataObject');
  Connection
    .DataObjects
    .update(id, payload)
    .then(this.completed)
    .catch(this.failure);
});

DataObjectsActions.removeDataObjects.listen( function(dataobjects) {
  dataobjects.map(function(dataobject) {
    console.info('DataObjectsActions::removeDataObjects');
    Connection
      .DataObjects
      .remove(dataobject)
      .then(this.completed)
      .catch(this.failure);
  }.bind(this));
});

module.exports = DataObjectsActions;