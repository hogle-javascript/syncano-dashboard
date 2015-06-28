var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();

var GroupsActions = Reflux.createActions({
  checkItem     : {},
  uncheckAll    : {},
  fetch         : {},
  setGroups     : {},
  showDialog    : {},
  dismissDialog : {},

  fetchGroups: {
    asyncResult: true,
    children: ['completed', 'failure']
  },
  createGroup: {
    asyncResult: true,
    asyncForm: true,
    children: ['completed', 'failure']
  },
  updateGroup: {
    asyncResult: true,
    asyncForm: true,
    children: ['completed', 'failure']
  },
  removeGroups: {
    asyncResult: true,
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
  ids.map(function(id) {
    console.info('GroupsActions::removeGroups');
    Connection
      .Groups
      .remove(id)
      .then(this.completed)
      .catch(this.failure);
  }.bind(this));
});

module.exports = GroupsActions;
