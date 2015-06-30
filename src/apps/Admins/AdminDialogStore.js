var Reflux                    = require('reflux'),

    // Utils & Mixins
    StoreFormMixin            = require('../../mixins/StoreFormMixin'),
    DialogStoreMixin          = require('../../mixins/DialogStoreMixin'),

    //Stores & Actions
    AdminsActions            = require('./AdminsActions'),
    AdminsInvitationsActions = require('./AdminsInvitationsActions');

var AdminDialogStore = Reflux.createStore({
  listenables : [
    AdminsActions,
    AdminsInvitationsActions
  ],
  mixins      : [
    StoreFormMixin,
    DialogStoreMixin
  ],

  roleMenuItems: [
    {
      payload : 'read',
      text    : 'read'
    },
    {
      payload : 'write',
      text    : 'write'
    },
    {
      payload : 'full',
      text    : 'full'
    }
  ],

  getInitialState: function() {
    return {
      email : '',
      role  : ''
    };
  },

  init: function() {
    this.listenToForms();
  },

  getRoles: function() {
    return this.roleMenuItems;
  },

  onCreateInvitationCompleted: function() {
    console.debug('AdminDialogStore::onCreateInvitationCompleted');
    this.dismissDialog();
    AdminsInvitationsActions.fetchInvitations();
  },

  onUpdateAdminCompleted: function() {
    console.debug('AdminDialogStore::onUpdateAdminCompleted');
    this.dismissDialog();
    AdminsActions.fetchAdmins();
  }

});

module.exports = AdminDialogStore;
