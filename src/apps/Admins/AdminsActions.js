var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();

var AdminsActions = Reflux.createActions({
  checkItem  : {},
  uncheckAll : {},
  fetch      : {},
  setAdmins  : {},

  fetchAdmins: {
    asyncResult: true,
    children: ['completed', 'failure']
  },
  updateAdmin: {
    asyncResult: true,
    asyncForm: true,
    children: ['completed', 'failure']
  },
  removeAdmin: {
    asyncResult: true,
    children: ['completed', 'failure']
  }
});

AdminsActions.fetchAdmins.listen(function() {
  console.info('AdminsActions::fetchAdmins');
  Connection
    .Admins
    .list()
    .then(this.completed)
    .catch(this.failure);
});

AdminsActions.updateAdmin.listen(function(name, payload) {
  console.info('AdminsActions::updateAdmin');
  Connection
    .Admins
    .update(name, payload)
    .then(this.completed)
    .catch(this.failure);
});

AdminsActions.removeAdmin.listen(function(names) {
  names.map(function(name) {
    console.info('AdminsActions::removeAdmins');
    Connection
      .Admins
      .remove(name)
      .then(this.completed)
      .catch(this.failure);
  }.bind(this));
});

module.exports = AdminsActions;
