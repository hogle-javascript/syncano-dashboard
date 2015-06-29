var React                    = require('react'),
    Reflux                   = require('reflux'),
    Router                   = require('react-router'),

    // Utils
    HeaderMixin              = require('../Header/HeaderMixin'),
    ButtonActionMixin        = require('../../mixins/ButtonActionMixin'),
    DialogsMixin             = require('../../mixins/DialogsMixin'),
    InstanceTabsMixin        = require('../../mixins/InstanceTabsMixin'),
    Show                     = require('../../common/Show/Show.react'),

    // Stores and Actions
    SessionActions           = require('../Session/SessionActions'),
    SessionStore             = require('../Session/SessionStore'),
    AdminsActions            = require('./AdminsActions'),
    AdminsStore              = require('./AdminsStore'),
    AdminsInvitationsActions = require('./AdminsInvitationsActions'),
    AdminsInvitationsStore   = require('./AdminsInvitationsStore'),

    // Components
    mui                      = require('material-ui'),
    Dialog                   = mui.Dialog,
    Container                = require('../../common/Container/Container.react'),
    FabList                  = require('../../common/Fab/FabList.react'),
    FabListItem              = require('../../common/Fab/FabListItem.react'),
    ColorIconPickerDialog    = require('../../common/ColorIconPicker/ColorIconPickerDialog.react'),

    // Local components
    AdminsList               = require('./AdminsList.react'),
    AddDialog                = require('./AdminsAddDialog.react');


module.exports = React.createClass({

  displayName: 'Admins',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(AdminsStore, 'admins'),
    Reflux.connect(AdminsInvitationsStore, 'invitations'),
    HeaderMixin,
    DialogsMixin,
    InstanceTabsMixin
  ],

  componentWillUpdate: function(nextProps, nextState) {
    console.info('Admins::componentWillUpdate');
    // Merging "hideDialogs"
    this.hideDialogs(nextState.admins.hideDialogs || nextState.invitations.hideDialogs);
  },

  componentWillMount: function() {
    console.info('Admins::componentWillMount');
    AdminsActions.fetch();
  },

  // Dialogs config
  initDialogs: function () {

    return [
      {
        dialog: AddDialog,
        params: {
          ref   : "addAdminDialog",
          mode  : "add",
          store : AdminsStore
        }
      },
      {
        dialog: AddDialog,
        params: {
          ref   : "editAdminDialog",
          mode  : "edit",
          store : AdminsStore
        }
      },
      {
        dialog: Dialog,
        params: {
          ref:    "deleteAdminDialog",
          title:  "Remove an Administrator",
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: "Confirm", onClick: this.handleDeleteAdmin}
          ],
          modal: true,
          children: 'Do you really want to delete ' + AdminsStore.getCheckedItems().length +' Administrator(s)?'
        }
      },
      {
        dialog: Dialog,
        params: {
          title:  "Resend an Invitation",
          ref  : "resendInvitationDialog",
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: "Confirm", onClick: this.handleResendInvitation}
          ],
          modal: true,
          children: 'Do you really want to resend ' + AdminsInvitationsStore.getCheckedItems().length + ' Invitation(s)?'
        }
      },
      {
        dialog: Dialog,
        params: {
          title:  "Delete an Invitation",
          ref  : "removeInvitationDialog",
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: "Confirm", onClick: this.handleRemoveInvitation}
          ],
          modal: true,
           children: 'Do you really want to delete ' + AdminsInvitationsStore.getCheckedItems().length + ' Invitation(s)?'
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
    AdminsInvitationsActions.resendInvitation(AdminsInvitationsStore.getCheckedItems());
  },
  handleRemoveInvitation: function() {
    console.info('Admins::handleRemoveInvitation');
    AdminsInvitationsActions.removeInvitation(AdminsInvitationsStore.getCheckedItems());
  },

  uncheckAll: function() {
    console.info('Admins::uncheckAll');
    AdminsActions.uncheckAll();
    AdminsInvitationsActions.uncheckAll();
  },

  checkAdminItem: function(id, state){
    AdminsInvitationsActions.uncheckAll();
    AdminsActions.checkItem(id, state);
  },

  checkInvitationItem: function(id, state){
    AdminsActions.uncheckAll();
    AdminsInvitationsActions.checkItem(id, state);
  },

  getPendingInvitations: function() {
    var invitations        = this.state.invitations.items || [],
        pendingInvitations = [];

    if (invitations.length > 0) {
      pendingInvitations = this.state.invitations.items.filter(function(element) {
        return (element.state !== "accepted");
      });
    }

    return pendingInvitations;
  },

  render: function () {

    var checkedAdmins      = AdminsStore.getNumberOfChecked(),
        checkedInvitations = AdminsInvitationsStore.getNumberOfChecked();

    return (
      <Container>
        {this.getDialogs()}

        <Show if={checkedAdmins > 0}>
          <FabList position="top">
            <FabListItem
              label         = "Click here to unselect all"
              mini          = {true}
              onClick       = {this.uncheckAll}
              iconClassName = "synicon-checkbox-multiple-marked-outline" />

            <FabListItem
              label         = "Click here to delete Administrator"
              mini          = {true}
              onClick       = {this.showDialog('deleteAdminDialog')}
              iconClassName = "synicon-delete" />

            <FabListItem
              label         = "Click here to edit Admin"
              mini          = {true}
              disabled      = {checkedAdmins > 1}
              onClick       = {this.showDialog('editAdminDialog')}
              iconClassName = "synicon-pencil" />

          </FabList>
        </Show>

        <Show if={checkedInvitations > 0}>
          <FabList position="top">

            <FabListItem
              label         = "Click here to unselect all"
              mini          = {true}
              onClick       = {this.uncheckAll}
              iconClassName = "synicon-checkbox-multiple-marked-outline" />

            <FabListItem
              label         = "Click here to delete Invitation"
              mini          = {true}
              onClick       = {this.showDialog('removeInvitationDialog')}
              iconClassName = "synicon-delete" />

            <FabListItem
              label         = "Click here to resend invitation"
              mini          = {true}
              onClick       = {this.showDialog('resendInvitationDialog')}
              iconClassName = "synicon-backup-restore" />

          </FabList>
        </Show>

        <FabList>
          <FabListItem
            label         = "Click here to invite Admin"
            onClick       = {this.showDialog('addAdminDialog')}
            iconClassName = "synicon-plus" />
        </FabList>

        <AdminsList
          name       = "Administrators"
          checkItem  = {this.checkAdminItem}
          isLoading  = {this.state.admins.isLoading}
          items      = {this.state.admins.items}/>

        <AdminsList
          name                 = "Invitations"
          mode                 = "invitations"
          emptyItemHandleClick = {this.showDialog('addAdminDialog')}
          emptyItemContent     = "Invite administrators"
          checkItem            = {this.checkInvitationItem}
          isLoading            = {this.state.invitations.isLoading}
          items                = {this.getPendingInvitations()} />

      </Container>
    );
  }

});