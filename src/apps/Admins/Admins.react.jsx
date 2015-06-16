var React                    = require('react'),
    Reflux                   = require('reflux'),
    Router                   = require('react-router'),

    // Utils
    HeaderMixin              = require('../Header/HeaderMixin'),
    ButtonActionMixin        = require('../../mixins/ButtonActionMixin'),
    DialogsMixin             = require('../../mixins/DialogsMixin'),
    InstanceTabsMixin        = require('../../mixins/InstanceTabsMixin'),

    // Stores and Actions
    SessionActions           = require('../Session/SessionActions'),
    SessionStore             = require('../Session/SessionStore'),
    AdminsActions            = require('./AdminsActions'),
    AdminsStore              = require('./AdminsStore'),
    AdminsInvitationsActions = require('./AdminsInvitationsActions'),
    AdminsInvitationsStore   = require('./AdminsInvitationsStore'),


    // Components
    mui                      = require('material-ui'),
    FloatingActionButton     = mui.FloatingActionButton,
    Dialog                   = mui.Dialog,
    Container                = require('../../common/Container/Container.react'),
    FabList                  = require('../../common/Fab/FabList.react'),
    ColorIconPickerDialog    = require('../../common/ColorIconPicker/ColorIconPickerDialog.react'),

    // Local components
    AdminsList               = require('./AdminsList.react'),
    AddDialog                = require('./AdminsAddDialog.react');


module.exports = React.createClass({

  displayName: 'Admins',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(AdminsStore),
    Reflux.connect(AdminsInvitationsStore, 'invitations'),
    HeaderMixin,
    DialogsMixin,
    InstanceTabsMixin
  ],

  componentWillUpdate: function(nextProps, nextState) {
    console.info('Admins::componentWillUpdate');
    // Merging "hideDialogs
    this.hideDialogs(nextState.hideDialogs || nextState.invitations.hideDialogs);
  },

  componentWillMount: function() {
    console.info('Admins::componentWillMount');
    AdminsStore.refreshData();
    AdminsInvitationsStore.refreshData();
  },
    // Dialogs config
  initDialogs: function () {

    return [
      {
        dialog: AddDialog,
        params: {
          ref  : "addAdminDialog",
          mode : "add"
        }
      },
      {
        dialog: AddDialog,
        params: {
          ref  : "editAdminDialog",
          mode : "edit"
        }
      },
      {
        dialog: Dialog,
        params: {
          ref:    "deleteAdminDialog",
          title:  "Delete API key",
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: "Yes, I'm sure.", onClick: this.handleDeleteAdmin}
          ],
          modal: true,
          children: 'Do you really want to delete ' + AdminsStore.getCheckedItems().length +' Admins?',
        }
      },
      {
        dialog: Dialog,
        params: {
          title:  "Resend Invitation",
          ref  : "resendInvitationDialog",
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: "Yes, I'm sure.", onClick: this.handleResendInvitation}
          ],
          modal: true,
          children: 'Do you really want to resend this Invitation?'
        }
      },
      {
        dialog: Dialog,
        params: {
          title:  "Delete Invitation",
          ref  : "removeInvitationDialog",
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: "Yes, I'm sure.", onClick: this.handleRemoveInvitation}
          ],
          modal: true,
           children: 'Do you really want to delete ' + AdminsInvitationsStore.getCheckedItems().length +' Invitations?',
        }
      }
    ]
  },

  handleDeleteAdmin: function() {
    console.info('Admins::handleDelete');
    AdminsActions.removeAdmins(AdminsStore.getCheckedItems());
  },

  handleResendInvitation: function() {
    console.info('Admins::handleResendInvitation');
    AdminsInvitationsActions.resendInvitation(AdminsStore.getCheckedItem().id);
  },
  handleRemoveInvitation: function() {
    console.info('Admins::handleRemoveInvitation');
    AdminsInvitationsActions.removeInvitation(AdminsStore.getCheckedItem().id);
  },

  uncheckAll: function() {
    console.info('Admins::uncheckAll');
    AdminsActions.uncheckAll();
    AdminsInvitationsActions.uncheckAll();
  },

  render: function () {

    var checkedAdmins      = AdminsStore.getNumberOfChecked(),
        checkedInvitations = AdminsInvitationsStore.getNumberOfChecked();

    return (
      <Container>
        {this.getDialogs()}

        <FabList
          style={{top: 200, display: checkedAdmins ? 'block': 'none'}}>

          <FloatingActionButton
            label         = "Click here to unselect all" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            onClick       = {this.uncheckAll}
            iconClassName = "synicon-checkbox-multiple-marked-outline" />

          <FloatingActionButton
            label         = "Click here to delete Admins" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            onClick       = {this.showDialog('deleteAdminDialog')}
            iconClassName = "synicon-delete" />

          <FloatingActionButton
            label         = "Click here to edit Admin" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            disabled      = {checkedAdmins > 1}
            onClick       = {this.showDialog('resetAdminDialog')}
            iconClassName = "synicon-backup-restore" />

        </FabList>

        <FabList
          style={{bottom: 100}}>
          <FloatingActionButton
            label         = "Click here to invite Admin" // TODO: extend component
            color         = "" // TODO: extend component
            onClick       = {this.showDialog('addAdminDialog')}
            iconClassName = "synicon-plus" />
        </FabList>

        <AdminsList
          name       = "Administrators"
          checkItem  = {AdminsActions.checkItem}
          isLoading  = {AdminsActions.isLoading}
          items      = {this.state.items}/>

        <AdminsList
          name      = "Invitations"
          checkItem = {AdminsInvitationsActions.checkItem}
          isLoading = {AdminsInvitationsActions.isLoading}
          items     = {this.state.invitations.items} />

      </Container>
    );
  }

});