var Reflux     = require('reflux'),

    Syncano    = require('../Session/Connection'),
    Connection = require('../Session/Connection').get(),
    D          = Syncano.D;

var AdminsActions = Reflux.createActions({
  checkItem  : {},
  uncheckAll : {},
  fetch      : {},
  setAdmins  : {},
  showDialog    : {},
  dismissDialog : {},
  fetchAdmins: {
    asyncResult : true,
    loading     : true,
    children    : ['completed', 'failure']
  },
  updateAdmin: {
    asyncResult : true,
    asyncForm   : true,
    loading     : true,
    children    : ['completed', 'failure']
  },
  removeAdmins: {
    asyncResult: true,
    loading    : true,
    children   : ['completed', 'failure']
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

AdminsActions.removeAdmins.listen(function(admins) {
  console.info('AdminsActions::removeAdmins');
  var promises = admins.map(function(admin) {
    Connection.Admins.remove(admin)
  });

  D.all(promises)
    .success(this.completed)
    .error(this.failure);
});

module.exports = AdminsActions;
