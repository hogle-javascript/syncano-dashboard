var Reflux     = require('reflux'),
    Syncano    = require('../Session/Connection'),
    Connection = Syncano.get(),
    D          = Syncano.D;

var GroupsActions = Reflux.createActions({
  checkItem  : {},
  uncheckAll : {},
  fetch      : {},
  setGroups  : {},
  showDialog    : {},
  dismissDialog : {},
  fetchGroups: {
    asyncResult: true,
    loading    : true,
    children   : ['completed', 'failure']
  },
  createGroup: {
    asyncResult : true,
    asyncForm   : true,
    loading     : true,
    children    : ['completed', 'failure']
  },
  updateGroup: {
    asyncResult : true,
    asyncForm   : true,
    loading     : true,
    children    : ['completed', 'failure']
  },
  removeGroups: {
    asyncResult : true,
    loading     : true,
    children: ['completed', 'failure']
  }
});

GroupsActions.createGroup.listen(function(label) {
  console.info('GroupsActions::createGroup');
  Connection
    .Groups
    .create(label)
    .then(this.completed)
    .catch(this.failure);
});

GroupsActions.fetchGroups.listen(function() {
  console.info('GroupsActions::fetchGroups');
  Connection
    .Groups
    .list()
    .then(this.completed)
    .catch(this.failure);
});

GroupsActions.updateGroup.listen(function(id, payload) {
  console.info('GroupsActions::updateGroup');
  Connection
    .Groups
    .update(id, payload)
    .then(this.completed)
    .catch(this.failure);
});

GroupsActions.removeGroups.listen(function(ids) {
  console.info('GroupsActions::removeGroups');
  var promises = ids.map(function(id) {
    return Connection.Groups.remove(id);
  });

  D.all(promises)
    .success(this.completed)
    .error(this.failure);
});

module.exports = GroupsActions;
