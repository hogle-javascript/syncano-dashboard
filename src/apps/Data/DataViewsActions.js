var Reflux     = require('reflux'),

    Syncano    = require('../Session/Connection'),
    Connection = Syncano.get(),
    D          = Syncano.D;

var DataViewsActions = Reflux.createActions({
  checkItem    : {},
  uncheckAll   : {},
  fetch        : {},
  setDataViews : {},
  showDialog   : {},
  dismissDialog: {},
  fetchDataViews: {
    asyncResult : true,
    children    : ['completed', 'failure']
  },
  createDataView: {
    asyncResult : true,
    asyncForm   : true,
    children    : ['completed', 'failure']
  },
  updateDataView: {
    asyncResult : true,
    asyncForm   : true,
    children    : ['completed', 'failure']
  },
  removeDataViews: {
    asyncResult : true,
    children    : ['completed', 'failure']
  }

});

DataViewsActions.createDataView.listen(function(payload) {
  console.info('DataViewsActions::createDataView', payload);
  Connection
    .DataViews
    .create(payload)
    .then(this.completed)
    .catch(this.failure);
});

DataViewsActions.fetchDataViews.listen(function() {
  console.info('DataViewsActions::fetchDataViews');
  Connection
    .DataViews
    .list()
    .then(this.completed)
    .catch(this.failure);
});

DataViewsActions.updateDataView.listen(function(id, payload) {
  console.info('DataViewsActions::updateDataView');
  Connection
    .DataViews
    .update(id, payload)
    .then(this.completed)
    .catch(this.failure);
});

DataViewsActions.removeDataViews.listen(function(dataviews) {
  console.info('DataViewsActions::removeDataViews');
  var promises = dataviews.map(function(dataview) {
    return Connection.DataViews.remove(dataview.name);
  });

  D.all(promises)
    .success(this.completed)
    .error(this.failure);
});

module.exports = DataViewsActions;
