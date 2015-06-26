var Reflux     = require('reflux'),
    Connection = require('../Session/Connection').get();

var ProfileActions = Reflux.createActions({
  updateSettings: {
    asyncResult: true,
    asyncForm: true,
    children: ['completed', 'failure']
  },
  changePassword: {
    asyncResult: true,
    children: ['completed', 'failure']
  }
});

ProfileActions.updateSettings.listen(function(payload) {
  console.info('ProfileActions::updateSettings');
  Connection
    .Accounts
    .update({
      first_name: payload.firstName,
      last_name: payload.lastName
    })
    .then(this.completed)
    .catch(this.failure);
});

ProfileActions.changePassword.listen(function(payload) {
  console.info('ProfileActions::changePassword');
  Connection
    .Accounts
    .changePassword({
      current_password: payload.currentPassword,
      new_password: payload.newPassword
    })
    .then(this.completed)
    .catch(this.failure);
});

module.exports = ProfileActions;
