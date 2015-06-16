var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();


var AdminsActions = Reflux.createActions({
  checkItem  : {},
  uncheckAll : {},

  'getAdmins': {
      asyncResult: true,
      children: ['completed', 'failure']
  },
  'updateAdmin': {
      asyncResult: true,
      children: ['completed', 'failure']
  },
  'removeAdmin': {
      asyncResult: true,
      children: ['completed', 'failure']
  },


});

AdminsActions.getAdmins.listen( function(payload) {
  console.info('AdminsActions::getAdmins');
  Connection
    .Admins
    .list()
    .then(this.completed)
    .catch(this.failure);
});

AdminsActions.updateAdmin.listen( function(name, payload) {
  console.info('AdminsActions::updateAdmin');
  Connection
    .Admins
    .update(name, payload)
    .then(this.completed)
    .catch(this.failure);
});

AdminsActions.removeAdmin.listen( function(names) {
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