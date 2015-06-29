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
      // jscs:disable
      first_name : payload.firstName,
      last_name  : payload.lastName
      // jscs:enable
    })
    .then(this.completed)
    .catch(this.failure);
});

ProfileActions.changePassword.listen(function(payload) {
  console.info('ProfileActions::changePassword');
  Connection
    .Accounts
    .changePassword({
      // jscs:disable
      current_password : payload.currentPassword,
      new_password     : payload.newPassword
      // jscs:enable
    })
    .then(this.completed)
    .catch(this.failure);
});

module.exports = ProfileActions;
